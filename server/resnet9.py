import torch
import torch.nn as nn
import torch.nn.functional as F

class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch
        out = self(images)
        loss = F.cross_entropy(out, labels)
        return loss
    
    # Calculates loss and accuracy relative to each batch
    # Returns dictionary of loss and accuracy
    def validation_step(self, batch):
        print('validation step start')
        images, labels = batch
        out = self(images)
        loss = F.cross_entropy(out, labels)
        acc = accuracy(out, labels)
        print('validation step end')
        return {'validation_loss': loss.detach(), 'validation_accuracy': acc.detach()}  # Detaches loss and acc from other model info stored from how it was derived
    
    # Receives list of dictionaries containing loss and accuracy
    # Finds the mean loss and the mean accuracy for the entire epoch 
    def validation_epoch_end(self, outputs):
        batch_losses = [x['validation_loss'] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()                                   # converts list of tensors into one tensor and extracts mean
        batch_accs = [x['validation_accuracy'] for x in outputs]
        epoch_acc = torch.stack(batch_accs).mean()
        print('validation_loss: ', epoch_loss.item(), 'validation_accuracy:', epoch_acc.item())
        return {'validation_loss': epoch_loss.item(), 'validation_accuracy': epoch_acc.item()}
    
    # Prints epoch summary of loss and accuracy as taken from validation_epoch_end function above
    # Training loss is new
    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5}, train_loss: {:.4f}, validation_loss: {:.4f}, validation_accuracy: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['validation_loss'], result['validation_accuracy']))
        
# Stores 1 for correct, 0 for false
def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    total_correct = torch.sum(preds == labels).item()
    total_predictions = len(preds)
    return torch.tensor(total_correct / total_predictions)

def conv_block(in_channels, out_channels, pool=False, dropout_rate=0.2):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
              nn.BatchNorm2d(out_channels),     
              nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(2))
    if dropout_rate > 0:
        layers.append(nn.Dropout(dropout_rate))
    return nn.Sequential(*layers)                                              

class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_classes, dropout_rate=0.2):
        super().__init__()
        
        # in_channels -> 64 channels -> 128 channels
        # When pool=True, image dimensions are halved
        self.conv1 = conv_block(in_channels, 64, pool=False, dropout_rate=dropout_rate)                  
        self.conv2 = conv_block(64, 128, pool=True, dropout_rate=dropout_rate)                            
        self.res1 = nn.Sequential(conv_block(128, 128, pool=False, dropout_rate=dropout_rate), 
                                  conv_block(128, 128, pool=False, dropout_rate=dropout_rate))  
        
        self.conv3 = conv_block(128, 256, pool=True, dropout_rate=dropout_rate)                          
        self.conv4 = conv_block(256, 512, pool=True, dropout_rate=dropout_rate)                          
        self.res2 = nn.Sequential(conv_block(512, 512, pool=False, dropout_rate=dropout_rate), 
                                  conv_block(512, 512, pool=False, dropout_rate=dropout_rate))  
        
        self.classifier = nn.Sequential(nn.MaxPool2d(12),                       
                                        nn.Flatten(), 
                                        nn.Dropout(dropout_rate),              
                                        nn.Linear(512, num_classes))           
        
    # Method to set dropout rate
    def set_dropout_rate(self, dropout_rate):
        self.dropout_rate = dropout_rate
        for module in self.modules():
            if isinstance(module, nn.Dropout):
                module.p = dropout_rate
        
    def forward(self, xb):
        # input -> 2 conv layers -> res layer + prev output -> 2 conv layers -> res layer + prev output -> Pool -> Flatten -> Linear
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out
    

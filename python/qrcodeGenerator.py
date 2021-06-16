from pyqrcode import QRCode
test = 'test'
myQR = QRCode(test)
myQR.png('test', scale=8)
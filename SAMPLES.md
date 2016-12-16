###Install (Local):

```
git clone https://github.com/Openovate/globe-api
(sudo) npm install -g [path-to-folder]/connect-cli
```

###Install (via NPM):

```
npm install -g globe-connect
```

###Send SMS:

```
globe-connect sms -a 9065272450 -m "Hello World" -s 21584130 -c 12345 -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc"
```

###Binary SMS:

```
globe-connect binarysms -c "21584130" -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc" -u "12345" -d 1 -a "9065272450" -m "samplebinarymessage" --verbose
```

###Location:

```
globe-connect location -a 9065272450 -c 10 -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc" --verbose
```

###Payment:

```
globe-connect payment -a 0.00 -d "description" -e 9065272450 -r 41301000206 -s Charged -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc" --verbose
```

###Payment GET Last reference:

```
globe-connect get-last-reference -ai "5ozgSgeRyeHzacXo55TR65HnqoAESbAz" -as "3dbcd598f268268e13550c87134f8de0ec4ac1100cf0a68a2936d07fc9e2459e" --verbose
```

###Subscriber Balance:

```
globe-connect subscr-bal -a 9065272450 -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc" --verbose
```

###Subscriber Reload Amount:

```
globe-connect subscr-reload-amt -a 9065272450 -t "JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc" --verbose
```

###Amax:

```
globe-connect amax -i "5ozgSgeRyeHzacXo55TR65HnqoAESbAz" -s "3dbcd598f268268e13550c87134f8de0ec4ac1100cf0a68a2936d07fc9e2459e" -t "w7hYKxrE7ooHqXNBQkP9lg" -p "FREE10MB" -a 9065272450 --verbose
```

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}


var coords = [

[33.4110107,-104.3735809],
[33.407341,-104.3659058],
[33.4057846,-104.3781433
],[32.3574219,-104.0489578
],[32.3357201,-104.2695236
],[32.0042725,-103.9584808
],[32.3438454,-104.3044586
],[32.6445770,-104.5350571
],[32.6410522,-104.5382309
],[32.6337891,-104.5350037
],[32.6388741,-104.5349960
],[32.844223,-104.0577774
],[32.0210342,-103.9788208
],[32.0212364,-103.9734955
],[32.0213394,-103.97509
],[32.0209122,-103.9685593
],[32.0209465,-103.9690399
],[32.0207672,-103.966301
],[32.0208764,-103.9667689
],[32.6482544,-104.5350952
],[32.6515884,-104.5352020
],[32.0096397,-103.9484940
],[32.0078506,-103.9518127
],[32.0069847,-103.9574661
],[32.0097275,-103.9605103
],[32.556118,-103.9747849
],[32.2993126,-104.2485809
],[32.3065796,-104.2405014
],[32.2882843,-104.2410965
],[32.0525360,-103.5579987
],[32.0560875,-103.5537415
],[32.0525398,-103.5622787
],[32.3563190,-104.2859283
],[32.3600273,-104.3002777
],[32.0143738,-103.9570389
],[32.0927086,-103.9473953
],[32.0175972,-103.9520569
],[32.0063744,-103.9487228
],[32.0144310,-103.9484100
],[32.3614273,-104.2874985
],[32.3471970,-104.0287781
],[32.3368568,-104.0326614
],[32.3305359,-104.0292892
],[32.3385673,-104.0446863
],[32.3374863,-104.0347290
],[32.3338432,-104.0330811
],[32.3284798,-104.0330811
],[32.3253326,-104.0380249
],[32.3259087,-104.0331802
],[32.3259392,-104.0331039
],[32.3259811,-104.0425873
],[32.3249092,-104.0478363
],[32.3259468,-104.0343781
],[32.3251724,-104.0427475
],[32.3268656,-104.0219449
],[32.341568,-104.0275116
],[32.3429337,-104.0252686
],[32.3397657,-104.0323163
],[32.3392348,-104.0164968
],[32.3392852,-104.0323189
],[32.3410835,-104.0298767
],[32.0033035,-103.9490051
],[32.0010338,-103.9529266
],[32.0927086,-103.9473190
],[32.0926285,-103.9528732
],[32.0926247,-103.9486084
],[32.079834,-103.957222
],[32.0794067,-103.9559784
],[32.0794067,-103.9558945
],[32.0930557,-103.9538787
],[32.0931262,-103.9372505
],[32.0927086,-103.9473953
],[32.079725,-103.9516162
],[32.0797250,-103.9515357
],[32.0797257,-103.9514552
],[32.0800169,-103.9627778
],[32.0072937,-103.9659729
],[33.0143051,-104.1595383
],[32.3438644,-104.2958145
],[32.0188599,-103.8728368
],[32.0526352,-103.8766403
],[32.0490074,-103.8766403
],[32.0379295,-103.8637466
],[32.0416603,-103.8679886
],[32.0380325,-103.8680115
],[32.0486069,-103.8718949
],[32.0441742,-103.8747177
],[32.0438766,-103.872879
],[32.0484810,-103.8679428
],[32.0472336,-103.8615570
],[32.0453072,-103.9005585
],[32.0366516,-103.8961563
],[32.0449066,-103.8970413
],[32.0489311,-103.902359
],[32.0361404,-103.9022293
],[32.0490990,-103.8962936
],[32.0357895,-103.9051819
],[32.0489464,-103.8974533
],[32.0307465,-103.8809280
],[32.0298309,-103.8851852
],[32.0526237,-103.8809052
],[32.0562515,-103.8809128
],[32.0526123,-103.8851624
],[32.0562897,-103.8679581
],[32.0562668,-103.8758469
],[32.0529327,-103.8679428
],[32.0557289,-103.8717422
],[32.0526695,-103.8636856
],[32.0526505,-103.8716049
],[32.0489426,-103.8981018
],[32.0471039,-103.9067154
],[32.0452881,-103.9067154
],[32.0494003,-103.9099045
],[32.0415726,-103.9067230
],[32.0379448,-103.9067307
],[32.0379562,-103.9023819
],[32.04892,-103.9100847
],[32.0370293,-103.9092178
],[32.0409698,-103.8959885
],[32.0494003,-103.9098206
],[32.0492796,-103.909725
],[32.0340805,-103.8911209
],[32.0340805,-103.8906326
],[32.0307236,-103.891716
],[32.0307274,-103.8895874
],[32.0270042,-103.8903732
],[32.0258217,-103.8895569
],[32.0270157,-103.8809204
],[32.0223007,-103.8916702
],[32.0224686,-103.8895416
],[32.022625,-103.8845978
],[32.0238266,-103.8809128
],[32.0270119,-103.8843765
],[32.0197411,-103.8926239
],[32.0196648,-103.8883667
],[32.0188466,-103.8840942
],[32.01787882,-103.8815815
],[32.0161209,-103.8851547
],[32.01613196,-103.8809067
],[32.0599861,-103.8809204
],[32.0629311,-103.8802795
],[32.0357933,-103.8995534
],[32.0257400,-103.5434720
],[32.0257400,-103.5434430
],[32.0352088,-103.9120606
],[32.03579353,-103.8994724
],[32.0496421,-103.9040781
],[32.0496421,-103.9039962
],[32.0496421,-103.9039143
],[32.0196704,-103.8904924
],[32.0047607,-103.8798141
],[32.0161476,-103.8658600
],[32.0224991,-103.8669281
],[32.0124092,-103.8584137
],[32.0078735,-103.8594818
],[32.0183449,-103.8669281
],[32.0149612,-103.8679962
],[32.0188637,-103.8713150
],[32.0157623,-103.8713074
],[32.0124779,-103.8546295
],[32.0224915,-103.8713226
],[32.0114975,-103.8669281
],[32.0020142,-103.8798141
],[32.0115013,-103.8626709
],[32.0270348,-103.8680038
],[32.0336418,-103.8763428
],[32.0340919,-103.8714218
],[32.0304794,-103.8773956
],[32.0302429,-103.8713455
],[32.0307732,-103.8680191
],[32.0307808,-103.8637543
],[32.02611657,-103.8766516
],[32.02612331,-103.8718851
],[32.0269012,-103.8626175
],[32.0347443,-103.8758621
],[32.0233917,-103.8763275
],[32.0347519,-103.8757782
],[32.0197639,-103.8766403
],[32.0197792,-103.8637314
],[32.0143166,-103.8766327
],[32.0161514,-103.8637314
],[32.0105858,-103.8723602
],[32.00836059,-103.8769379
],[32.0076523,-103.8658676
],[32.0087814,-103.8628387
],[32.0343971,-103.8702927
],[32.0344048,-103.867363
],[32.3537674,-104.0573807
],[32.3544159,-104.0514145
],[32.354599,-104.054184
],[32.3088531,-104.3221817
],[32.3318367,-104.2917557
],[32.3505402,-104.3002625
],[32.3532600,-104.2970886
],[32.3496361,-104.3045273
],[32.3527145,-104.3034973
],[32.3505363,-104.2959595
],[32.3541679,-104.2971039
],[32.3330994,-104.3514633
],[33.043335,-104.1132584
],[32.0018005,-103.9607697
],[32.0492119,-103.8823973
],[32.0492119,-103.8823154
],[32.0492119,-103.8822335
],[32.0491893,-103.8789793
],[32.0491893,-103.8788974
],[32.0491921,-103.8788201
],[32.0491921,-103.8787382
],[32.0070152,-103.9444275
],[32.0072250,-103.9401703
],[32.0108566,-103.9399261
],[32.3760796,-104.2809448]];



var x = 32.8423;
var y = -104.4033;
var sum = 0;
for (let i = 0; i < coords.length; i++ ) {
    sum +=  distance(x, y, coords[i][0], coords[i][1], "K");
    
}
console.log("total miles: " + sum * 1.5);
console.log("average distance in miles: " + sum * 1.5 /coords.length);
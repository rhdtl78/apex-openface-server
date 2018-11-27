#!/bin/bash

argc=$#

if [ 2 -eq $argc ]
then
    imgPath=$1
    name=$2
    filename="$(date +'%Y_%m_%d_%H_%M_%S').jpg"
    mv $imgPath ./trainingImages/$name/$filename
fi
./openface/util/align-dlib.py ./trainingImages/ align outerEyesAndNose ./openface/aligned-images/ --size 96
./openface/batch-represent/main.lua -outDir ./openface/generated-embeddings -data ./openface/aligned-images/
./openface/demos/classifier.py train ./openface/generated-embeddings
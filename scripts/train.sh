#!/bin/bash
./openface/util/align-dlib.py ./trainingImages/ align outerEyesAndNose ./openface/aligned-images/ --size 96
./openface/batch-represent/main.lua -outDir ./openface/generated-embeddings -data ./openface/aligned-images/
./openface/demos/classifier.py train ./openface/generated-embeddings

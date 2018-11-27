#!/bin/bash
set DIR=/root/apex-openface-server

$DIR/openface/demos/classifier.py infer $DIR/openface/generated-embeddings/classifier.pkl $DIR/inferImages/image.jpg
from transformers import pipeline
import sys

senti = pipeline('text-classification', model='nlptown/bert-base-multilingual-uncased-sentiment')

# res = senti('The entire coffee had spilled rate them 4 stars')
res = senti(sys.argv[1])
print(res[0]['label'][0])
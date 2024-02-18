from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import pickle

# Load the dataset
df = pd.read_excel('menu.xlsx')


# Convert descriptions to vectors using TF-IDF
vectorizer = TfidfVectorizer(analyzer='word',min_df=0.05)
description_vectors = vectorizer.fit_transform(df['Description'])
# Save the vectorizer
# pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
# Save the description vectors
# pickle.dump(description_vectors, open('description_vectors.pkl', 'wb'))
description_vectors = pickle.load(open('description_vectors.pkl', 'rb'))

# # Calculate the cosine distance matrix
cosine_sim_matrix = cosine_similarity(description_vectors, description_vectors)
# pickle.dump(cosine_sim_matrix, open('cosine_sim_matrix.pkl', 'wb'))
cosine_sim_matrix = pickle.load(open('cosine_sim_matrix.pkl', 'rb'))
# joblib.dump(cosine_sim_matrix, 'cosine_sim_matrix.pkl')
input_title = 'filter coffee'
# input_title = sys.argv[1]
# preprocessed_input = preprocess_text1(input_title)
# print(preprocessed_input)
preprocessed_input = input_title
input_vector = vectorizer.transform([preprocessed_input])
cosine_sim_scores = cosine_similarity(input_vector, description_vectors)[0]
top_indices = cosine_sim_scores.argsort()[::-1][:3]
top_recommendations = df.loc[top_indices, ['Name', 'Medium_price', 'Large_price']]
# similarity_scores = cosine_sim_scores[top_indices]
# top_recommendations['similarity_score'] = similarity_scores

string = ""
for index, row in top_recommendations.iterrows():
    string += row['Name'] + " - Medium: Rs." + str(row['Medium_price']) + " Large: Rs." + str(row['Large_price']) + "\n"

print(string)
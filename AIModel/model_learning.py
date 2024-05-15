from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import MultinomialNB
from joblib import dump, load
import matplotlib.pyplot as plt
from sklearn import metrics
import pandas as pd
import numpy as np

# Convert text to numerical features using CountVectorizer
comment_df = pd.read_csv(r"C:\Users\Senox\Desktop\Projects\CommentRatingSite\AIModel\cleaned_dataset.csv")

tfidf_vectorizer = TfidfVectorizer()
X_vect = tfidf_vectorizer.fit_transform(comment_df["cleaned_comments"])

# save learning vectorizer
dump(tfidf_vectorizer, "tfidf_vectorizer.bin", compress=True)

y = np.array(comment_df["labels"])
label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

# save learning encoder
dump(label_encoder, "label_encoder.bin", compress=True)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_vect, y_encoded, test_size=0.2, random_state=42)


def train_and_predict_finish_model():
    nb_classifier = MultinomialNB(alpha=0.5)
    lr_classifier = LogisticRegression(C=3, max_iter=300, class_weight=None, n_jobs=-1, random_state=42)
    svc_classifier = SVC(C=1, kernel="linear", probability=True, random_state=42)
    ec_classifier = VotingClassifier(estimators=[("Multinominal NB", nb_classifier),
                                                 ("Logistic Regression", lr_classifier),
                                                 ("Support Vector Machine", svc_classifier)], voting='soft',
                                     weights=[1, 2, 3])
    ec_classifier.fit(X_train, y_train)

    # save learning model
    dump(ec_classifier, "model_v_0_1.pkl", compress=True)
    pred = ec_classifier.predict(X_test)
    score = metrics.accuracy_score(y_test, pred)

    return score


train_and_predict_finish_model()

# def train_and_predict_SVC():
#     svc_classifier = SVC(probability=False)
#     params = {"kernel": ["linear"],
#               "C": [1],
#               "probability": [True]}
#     grid_classifier = GridSearchCV(svc_classifier, params, verbose=3)
#     grid_classifier.fit(X_train, y_train)
#     best_params = grid_classifier.best_params_
#     best_score = grid_classifier.best_score_
#
#     return best_params, best_score
#
#
# print(train_and_predict_SVC())
# # {'C': 1, 'kernel': 'linear'}, 0.5272227811442329)

# def train_and_predict_LogisticRegression():
#     lr_classifier = LogisticRegression(n_jobs=-1, random_state=42)
#     params = {"max_iter": range(300, 1000, 300),
#               "C": range(1, 10),
#               "class_weight": [None, "balanced"]}
#     grid_classifier = GridSearchCV(lr_classifier, params, verbose=3)
#     grid_classifier.fit(X_train, y_train)
#     best_params = grid_classifier.best_params_
#     best_score = grid_classifier.best_score_
#
#     return best_params, best_score
#
# print(train_and_predict_LogisticRegression())
# #best {'C': 3, 'class_weight': None, 'max_iter': 300} 0.524

# def train_and_predict_MultinomialNB(alpha):
#     nb_classifier = MultinomialNB(alpha=alpha)
#     nb_classifier.fit(X_train, y_train)
#     pred = nb_classifier.predict(X_test)
#     score = metrics.accuracy_score(y_test, pred)
#
#     return score
#
#
# alphas = np.arange(0, 10, 0.1)
#
# alpha_values = []
# scores = []
#
# for alpha in alphas:
#     scores.append(train_and_predict_MultinomialNB(alpha))
#     alpha_values.append(alpha)
#     print('Alpha: ', alpha)
#     print('Score: ', train_and_predict_MultinomialNB(alpha))
#     print()
# plt.plot(alpha_values, scores, label='train')
# plt.legend()
# plt.xlabel('Alpha')
# plt.ylabel('Score')
# plt.title('Score')
# plt.show()
# #best for alpha: 0.5 score 0.52

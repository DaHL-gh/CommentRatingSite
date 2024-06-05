import os

from joblib import dump, load
from .cleaner import CleanedKomm


class Model:
    module_dir = os.path.dirname(os.path.abspath(__file__))

    def __init__(self, model_version: str):
        self.komm_cleaner = CleanedKomm()
        self.tfidf_vectorizer = load(self.module_dir + r"\tfidf_vectorizer.bin")
        self.label_encoder = load(self.module_dir + r"\label_encoder.bin")
        self.model = load(self.module_dir + r"\model_v_0_1.pkl")

    def predict_single_comment(self, comment: str) -> str:
        clear_comment = self.komm_cleaner.clean_text(comment)
        vect_comment = self.tfidf_vectorizer.transform([clear_comment])
        return self.label_encoder.inverse_transform(self.model.predict(vect_comment))

    def predict_list_of_comments(self, list_of_comments: list) -> dict:
        count_com = pos_com = neg_com = neut_com = 0

        for comment in list_of_comments:
            count_com += 1

            predict = self.predict_single_comment(comment)

            if predict == 'positive':
                pos_com += 1
            elif predict == 'negative':
                neg_com += 1
            elif predict == 'neutral':
                neut_com += 1

        return {'comments_count': count_com, 'positive': pos_com, 'negative': neg_com, 'neutral': neut_com}

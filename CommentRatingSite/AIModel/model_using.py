import os

from joblib import dump, load
from CommentRatingSite.AIModel.cleaner import CleanedKomm


class Model:
    def __init__(self):
        self.komm_cleaner = CleanedKomm()
        self.module_dir = os.getcwd()
        self.tfidf_vectorizer = load(self.module_dir + "\\tfidf_vectorizer.bin")
        self.label_encoder = load(self.module_dir + "\label_encoder.bin")
        self.model = load(self.module_dir + "\model_v_0_1.pkl")

    def predict_single_comment(self, comment: list) -> str:
        clear_comment = self.komm_cleaner.clean_text(comment)
        vect_comment = self.tfidf_vectorizer.transform([clear_comment])
        return self.label_encoder.inverse_transform(self.model.predict(vect_comment))

    def predict_list_comments(self, list_of_comments: list) -> dict:
        count_com, pos_com, neg_com, skip_com, speech_com, neut_com = 0, 0, 0, 0, 0, 0
        for comment in list_of_comments:
            count_com += 1
            clear_comment = self.komm_cleaner.clean_text(comment)
            vect_comment = self.tfidf_vectorizer.transform([clear_comment])

            predict = self.label_encoder.inverse_transform(self.model.predict(vect_comment))

            if predict == 'positive':
                pos_com += 1
            elif predict == 'negative':
                neg_com += 1
            elif predict == 'neutral':
                neut_com += 1
            elif predict == 'skip':
                skip_com += 1
            else:
                speech_com += 1

        return {'positive': pos_com, 'negative': neg_com, 'neutral': neut_com, 'skip': skip_com, 'speech': speech_com}


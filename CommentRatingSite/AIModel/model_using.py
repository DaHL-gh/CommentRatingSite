import os

from joblib import dump, load
from .cleaner import CleanedKomm

module_dir = os.getcwd() + '\AIModel'
tfidf_vectorizer = load(module_dir + "\\tfidf_vectorizer.bin")
label_encoder = load(module_dir + "\label_encoder.bin")
model = load(module_dir + "\model_v_0_1.pkl")


def main():
    while True:
        user_text = input("Введите ваш текст: ")
        komm_cleaner = CleanedKomm()
        clear_user_text = komm_cleaner.clean_text(user_text)
        vect_user_text = tfidf_vectorizer.transform([clear_user_text])
        print(label_encoder.inverse_transform(model.predict(vect_user_text)))

        # val_db = pd.read_csv('cleaned_dataset1.csv')
        # count_com, pos_com, neg_com, skip_com, speech_com, neut_com = 1, 0, 0, 0, 0, 0
        # all_comments = len(val_db['cleaned_comments'])
        # for comment in val_db['cleaned_comments']:
        #     print(f"Проверено {count_com} из {all_comments}")
        #     count_com += 1
        #     vect_comment = vectorizer.transform([comment])
        #     predict = label_encoder.inverse_transform(ec_classifier.predict(vect_comment))
        #     if predict == 'positive':
        #         pos_com += 1
        #     elif predict == 'negative':
        #         neg_com += 1
        #     elif predict == 'neutral':
        #         neut_com += 1
        #     elif predict == 'skip':
        #         skip_com += 1
        #     else:
        #         speech_com += 1
        # print("Результат:")
        # print(f"Кол-во положительных комментариев: {pos_com}")
        # print(f"Кол-во отрицательных комментариев: {neg_com}")
        # print(f"Кол-во нейтральных комментариев: {neut_com}")
        # print(f"Кол-во пропущенных комментариев: {skip_com}")
        # print(f"Речь: {speech_com}")


def query(user_text: str) -> str:
        komm_cleaner = CleanedKomm()
        clear_user_text = komm_cleaner.clean_text(user_text)
        vect_user_text = tfidf_vectorizer.transform([clear_user_text])
        return label_encoder.inverse_transform(model.predict(vect_user_text))

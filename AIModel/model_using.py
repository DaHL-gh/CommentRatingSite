from joblib import dump, load
from cleaner import CleanedKomm

tfidf_vectorizer = load("tfidf_vectorizer.bin")
label_encoder = load("label_encoder.bin")
model = load("model_v_0_1.pkl")


def query(text):
    tfidf_vectorizer = load("tfidf_vectorizer.bin")
    label_encoder = load("label_encoder.bin")
    model = load("model_v_0_1.pkl")

    komm_cleaner = CleanedKomm()
    clear_user_text = komm_cleaner.clean_text(text)
    vect_user_text = tfidf_vectorizer.transform([clear_user_text])
    return label_encoder.inverse_transform(model.predict(vect_user_text))


def main():
    while True:
        user_text = input("Введите ваш текст: ")
        print(query(user_text))

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

if __name__ == '__main__':
    main()
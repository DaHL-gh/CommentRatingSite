import nltk
import re
import pandas as pd
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

nltk.download('wordnet')
nltk.download('punkt')


class CleanedKomm:
    def __init__(self):
        self.start_file = 'comment_dataset.csv'
        self.final_file = 'cleaned_dataset.csv'

    def remove_mentions(self, text):
        return re.sub(r'@\w+', '', text)

    def remove_links(self, text):
        return re.sub(r'http\S+', '', text)

    def clean_text(self, text):
        text = self.remove_mentions(text)
        text = self.remove_links(text)
        stop_words = set(stopwords.words('russian'))
        lemmatizer = WordNetLemmatizer()
        stemmer = PorterStemmer()

        tokens = word_tokenize(text.lower())
        cleaned_tokens = [stemmer.stem(lemmatizer.lemmatize(token)) for token in tokens if
                          token not in stop_words and len(token) >= 3 and token.isalnum()]

        return ' '.join(cleaned_tokens)

    def cleaning(self):
        start_data = pd.read_csv(self.start_file)
        start_data = start_data.astype(str)
        start_data['cleaned_comments'] = start_data['comments'].apply(self.clean_text)
        start_data = start_data[start_data['cleaned_comments'] != '']
        start_data.drop('comments', axis=1, inplace=True)

        final_data = start_data.copy()

        final_data.to_csv(self.final_file, index=False)
        print(f"Cleaning completed. Saved cleaned data to {self.final_file}")


if __name__ == '__main__':
    cleaner = CleanedKomm()
    cleaner.cleaning()

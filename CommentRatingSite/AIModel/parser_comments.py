from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from urllib.parse import urlparse
import os
import csv


class VkApp:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--remote-debugging-pipe")
        chrome_options.add_argument("--disable-dev-shm-usage")

        self._driver = webdriver.Chrome(options=chrome_options)
        self._url = None
        self._filename = None
        self._comments = []

    def _validate(self) -> None:
        members = dir(self)
        for member in members:
            if member.startswith("validate_"):
                validate_function = getattr(self, member)
                validate_function()

    def _validate_link(self) -> None:
        parsed_url = urlparse(self._url)

        domain = parsed_url.netloc

        if 'vk.com' not in domain:
            raise ValueError("This link is incorrect. It should be for vk.com")

    def _validate_filename(self):
        if not self._filename:
            self._filename = 'dataset.csv'

        if not self._filename.endswith('.csv'):
            self._filename += '.csv'

    def _get_comments(self) -> list:
        self._driver.get(self._url)
        comments = self._driver.find_elements(By.CLASS_NAME, 'wall_reply_text')
        self._to_list(comments)
        self._close()
        return self._comments

    def _close(self):
        self._driver.close()
        self._driver.quit()

    def _to_list(self, comments) -> list:
        for comment in comments:
            self._comments.append(comment.text)
        return self._comments

    def _save_list_to_csv(self, comments):
        _type = 'w'
        if os.path.exists(self._filename):
            _type = 'a'

        with open(self._filename, _type, newline='') as csvfile:
            writer = csv.writer(csvfile)
            if 'w' in _type:
                writer.writerow(["comments", "url"])
            for item in comments:
                writer.writerow([item, self._url])

    def get(self, url: str, csv: bool | None = False, filename: str | None = None):

        self._url = url
        self._filename = filename
        self._validate()
        if csv:
            self._save_list_to_csv(self._get_comments())
            return self._comments
        return self._get_comments()

    # _instance = None
    #
    # def __new__(cls, *args, **kwargs):
    #     if not isinstance(cls._instance, cls):
    #         cls._instance = object.__new__(cls, *args, **kwargs)
    #     return cls._instance
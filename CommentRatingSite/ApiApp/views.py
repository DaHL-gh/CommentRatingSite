from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from AIModel import parser_comments, model_using

class AiModelView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def post(self, request: Request):
        vkapp = parser_comments.VkApp()

        answer = {'positive': 0, 'neutral': 0, 'negative': 0, 'count': 0}

        comments = vkapp.get(request.data['url'])

        for com in comments:
            result = model_using.query(com)[0]
            if com != '':
                answer[result] += 1
                answer['count'] += 1
        return Response(answer)

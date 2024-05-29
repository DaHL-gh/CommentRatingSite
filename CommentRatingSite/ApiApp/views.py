from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView

from CommentRatingSite.AIModel.model_using import Model


class AiModelView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def post(self, request: Request):
        vkapp = parser_comments.VkApp()
        model = Model()

        comments = vkapp.get(request.data['url'])

        return Response(model.predict_list_comments(comments))



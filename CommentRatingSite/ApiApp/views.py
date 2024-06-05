from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status

from AIModel import parser_comments, model_using


class AiModelView(APIView):
    def post(self, request: Request):
        if 'model_version' in request.data:
            model_version = request.data['model_version']
        else:
            return Response({'message': 'no model_version in request'}, status=status.HTTP_400_BAD_REQUEST)

        if 'url' in request.data:
            url = request.data['url']
        else:
            return Response({'message': 'no url in request'}, status=status.HTTP_400_BAD_REQUEST)

        vkapp = parser_comments.VkApp()
        model = model_using.Model(model_version)

        try:
            result = model.predict_list_of_comments(vkapp.get(url))
        except:
            return Response({'message': 'Link is not valid'}, status=status.HTTP_400_BAD_REQUEST)

        answer = {'result': result,
                  'model_version': model_version}

        return Response(answer)
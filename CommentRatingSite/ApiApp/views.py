from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView


class AiModelView(APIView):
    def post(self, request: Request):

        answer = request.data

        return Response(answer)

from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Location, Comment, Post, Image, Album
from flask_login import current_user, login_user, logout_user, login_required
import sys
import dotenv
import os
import openai
from flask_cors import CORS, cross_origin
from app.forms import AIForm

ai_routes = Blueprint('ai', __name__)
dotenv.load_dotenv()

openai.api_key = os.environ.get('OPENAI_API_KEY')




@ai_routes.route('', methods=['POST'])
def call_robot():
    form = AIForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=form.data['prompt'],
            temperature=0.7,
            max_tokens=500,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        if response.choices[0].text:
            response_string = response.choices[0].text
            response_array = response_string.split('\n')
            response_array = response_array[1:]
            response_string = '\n'.join(response_array)
            if len(response_string) == 0:
                return jsonify('Hmmmmm, something went wrong. Please try again later.')
            return jsonify(response_string)
        else: 
            return jsonify('Hmmmmm, something went wrong. Please try again later.')
    return {'errors':form.errors}, 401
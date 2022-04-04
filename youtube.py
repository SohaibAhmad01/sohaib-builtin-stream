# -*- coding: utf-8 -*-
"""
Created on Mon Apr  4 23:17:30 2022

@author: sohai
"""

import pandas as pd
from googleapiclient.discovery import build
api_key = "AIzaSyD6jkdPfxwBGsEfQ98s1lZqIQtKYljQ0e4"
youtube = build('youtube','v3',developerKey=api_key)

def get_videos(service, **kwargs):
    #list to store the final result
    final_results = []
    
    #Returns a collection of search results 
    #that match the query parameters specified in the API request
    results = service.search().list(**kwargs).execute()
    
    #Specifying the number of pages to paginate
    #by default it will search for only first page
    i = 0
    max_pages = 1
    while results and i < max_pages:
        final_results.extend(results['items'])
 
        # Check if another page exists
        if 'nextPageToken' in results:
            kwargs['pageToken'] = results['nextPageToken']
            results = service.search().list(**kwargs).execute()
            i += 1
        else:
            break
 
    return final_results

#video comments
def get_video_comments(service, **kwargs):
    #this function will return parent from every comment thread
    
    comments = []
    #A commentThread resource contains information about a YouTube comment thread
    results = service.commentThreads().list(**kwargs).execute()
    
    while results:
        #list of comment threads that match the request criteria
        for item in results['items']:
            comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
            comments.append(comment)
        
        #it will keep on paginating untill all of comment have been scraped
        if 'nextPageToken' in results:
            kwargs['pageToken'] = results['nextPageToken']
            results = service.commentThreads().list(**kwargs).execute()
        else:
            break
 
    return comments

comments_obj = []
def search_videos_by_keyword(service, **kwargs):
    results = get_videos(service, **kwargs)
    for item in results:
        title = item['snippet']['title']
        video_id = item['id']['videoId']
        comments = get_video_comments(service, part='snippet', videoId=video_id, textFormat='plainText')
        comments_obj.append(comments)
        print(comments)


def queryYouTube(pk):
    keyword = 'Iphone'
    search_videos_by_keyword(youtube, q=keyword, part='id,snippet', eventType='completed', type='video')

    final_list = []
    for comment_list in comments_obj:
        for comment in comment_list:
            final_list.append(comment)
        print(final_list)
    result = []
    temp = {}

    for i in range(0,10):
        temp = {}
        temp['id'] = i
        temp['tweet'] = final_list[i]
    
        result.append(temp)
    
    df = pd.DataFrame(final_list)  
    df.to_csv('logan paul.csv')
    #return HttpResponse(pk)
queryYouTube('wwe')
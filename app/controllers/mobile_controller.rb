class MobileController < ApplicationController
  respond_to :js, :html
  
  def index
    @vote = Vote.new()
    
    # get state
    # if in "voting mode" set voting flag to true
    # get current voting and last votes
  end
  
  def create
    Pusher['test_channel'].trigger('vote', {
       vote_index: :params[:vote_index],
       comment: :params[:comment]
    })
    
    uid = request.session_options[:id]

    render 'index'
    # send vote get reply
    # if succ
      # if vote up add points
      # " " down take points
  end
end

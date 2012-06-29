class MobileController < ApplicationController
  def index
    #@vote = Vote.new()
    
    # get state
    # if in "voting mode" set voting flag to true
    # get current voting and last votes
  end
  
  def vote
    Pusher['test_channel'].trigger('greet', {
      :greeting => "Hello there voter!"
    })
    
    redirect_to :index
    # send vote get reply
    # if succ
      # if vote up add points
      # " " down take points
  end
end

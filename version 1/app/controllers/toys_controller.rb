class ToysController < ApplicationController

  def show
    @toy = Toy.find(params[:id])
  end

  def update
    @toy = Toy.find(params[:id])
    if @toy.update(toy_params)
      render json: @toy
    else
      render json: @toy.errors.full_messages, status: 422
    end
  end

  private
  def toy_params
    params.require(:toy).permit(
      :image_url, :name, :pokemon_id, :price, :happiness
    )
  end
end

import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreModel } from './genre.model';

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>
	) {}

	async bySlug(slug: string) {
		return await this.GenreModel.findOne({ slug }).exec();
	}
	async getCollections() {
		const genres = await this.getAll();
		const collections = genres;
		return collections;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			};

		return this.GenreModel.find(options)
			.select('-updatedAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	//Admin

	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id);
		if (!genre) throw new NotFoundException('Genre not found!');

		return genre;
	}

	async update(_id: string, dto: CreateGenreDto) {
		const updatedGenre = this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true, //new full data version of genre
		}).exec();

		if (!updatedGenre) throw new NotFoundException('Genre not found!');
		return updatedGenre;
	}

	//create empty genre
	async create() {
		const defaultValue: CreateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		};

		const genre = await this.GenreModel.create(defaultValue);
		return genre._id;
	}

	async delete(id: string) {
		const deletedGenre = this.GenreModel.findByIdAndDelete(id).exec();
		if (!deletedGenre) throw new NotFoundException('Genre not found!');
		return deletedGenre;
	}
}

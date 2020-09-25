export default class ErrorsClass {

	constructor() {
		this.errors = {};
	}

	get(field) {
		if(this.errors && this.errors[field]) {
			return this.errors[field][0];
		}
	}

	record(errors) {
		this.errors = errors.errors;
	}
}
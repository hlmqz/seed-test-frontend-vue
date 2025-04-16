import { defineStore } from 'pinia';
import requester from '@/util/requester';

export default defineStore('serverStore', {

	state: () => {
		return {
			error: null,
			session: null,
			dialog: true,
			sending: new Map(),
		}
	},

	actions: {
		async call(options){
			let uuid = window.crypto.randomUUID();
			try {
				this.sending.set(uuid, {uuid, url: options.url});
				let response = await requester.request(options);
				this.sending.delete(uuid);
				this.dialog = true;

				if(this.session?.user)
					this.session.loadedtime = new Date().getTime();

				return response.data;
			}
			catch(err){
				this.sending.delete(uuid);
				if(this.dialog){

					this.error = err?.response
							? err.response
							: {
									data:{
									code: err.code,
									messsage: err.message,
								}};
				}

				this.dialog = true;
				return null;
			}
		},
		async get(url, params = {}) {
			return  this.call({ method: 'GET', url, params });
		},
		async post(url, data) {
			return this.call({ method: 'POST', url, data });
		},
		async put(url, data) {
			return this.call({ method: 'PUT', url, data });
		},
		async delete(url) {
			return this.call({ method: 'DELETE', url });
		},

		async makeSession({ email, password }){
			this.dialog = false;
			await this.get('/sanctum/csrf-cookie');
			await this.post('/api/login', { email, password } );
			await this.loadSession();
		},

		async loadSession(){
			this.dialog = false;
			this.session = await this.get('/api/login');
			if(this.session?.user)
				this.session.loadedtime = new Date().getTime();
		},

		async closeSession(){
			this.dialog = false;
			await this.delete('/api/login');
			this.session = null;
		},

		async validateTimeSession(reload = true){

			if(!this.session || new Date().getTime() - this.session.loadedtime > this.session.lifetime){
				if(reload){
					await this.loadSession();
					return await this.validateTimeSession(false);
				}
				else
					return false;
			}

			return true;
		}
	}
});
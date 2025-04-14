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
				return response.data;
			}
			catch(err){
				this.sending.delete(uuid);
				if(this.dialog)
					this.error = err.response;

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
			let session = await this.get('/api/login');
			this.session = session?.user ? session : null;
		},

		async closeSession(){
			this.dialog = false;
			await this.delete('/api/login');
			this.session = null;
		}
	}
});
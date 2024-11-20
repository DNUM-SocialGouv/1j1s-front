// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default class GoogleTagManagerService {
	static readonly ADS_ID = 'DC-10089018';
	private status: 'unmounted' | 'mounting' | 'mounted' = 'unmounted';
	private pending = [];

	async mount() {
		if (this.status === 'mounted') { return; }
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const service = this;
		const result = new Promise((resolve) => {this.pending.push(resolve);});
		if (this.status === 'mounting') { return result; }

		this.status = 'mounting';
		window.dataLayer = window.dataLayer || [];
		window.tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + GoogleTagManagerService.ADS_ID, '', function () {
			window.gtag = function gtag() {
				// eslint-disable-next-line prefer-rest-params
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());

			if (typeof window.tarteaucitron.user.googleadsMore === 'function') {
				window.tarteaucitron.user.googleadsMore();
			}
			service.pending.forEach((resolve) => resolve());
			service.status = 'mounted';
		});
		return result;
	}

	cookies() {
		const googleIdentifier = GoogleTagManagerService.ADS_ID;
		let	tagUaCookie = '_gat_gtag_' + googleIdentifier,
			tagGCookie = '_ga_' + googleIdentifier;

		tagUaCookie = tagUaCookie.replace(/-/g, '_');
		tagGCookie = tagGCookie.replace(/G-/g, '');

		return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
	}
}

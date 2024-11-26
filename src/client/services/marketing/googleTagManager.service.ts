// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export default class GoogleTagManagerService {
	static readonly ADS_ID = 'DC-10089018';
	private mounted = false;

	mount() {
		if (this.mounted) { return; }

		window.dataLayer = window.dataLayer || [];
		window.tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + GoogleTagManagerService.ADS_ID, '', function () {
			window.gtag = function gtag() {
				// eslint-disable-next-line prefer-rest-params
				window.dataLayer.push(arguments);
			};
			window.gtag('js', new Date());
			const additional_config_info = (window.timeExpire !== undefined) ? {
				anonymize_ip: true,
				cookie_expires: window.timeExpire / 1000,
			} : { anonymize_ip: true };

			window.gtag('config', GoogleTagManagerService.ADS_ID, additional_config_info);

			if (typeof window.tarteaucitron.user.googleadsMore === 'function') {
				window.tarteaucitron.user.googleadsMore();
			}
			document.dispatchEvent(new CustomEvent('gtag_ready'));
		});
		this.mounted = true;
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

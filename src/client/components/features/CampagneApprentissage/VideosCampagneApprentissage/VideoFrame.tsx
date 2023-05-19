import classNames from 'classnames';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideoFrame.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { CookiesService } from '~/client/services/cookies/cookies.service';
import { YoutubeService } from '~/client/services/video/video.service';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

function acceptYoutubeCookies() {
	window.tarteaucitron.userInterface.respond(document.getElementById('youtubeAllowed'), true);
}

interface VideoFrameProps extends React.ComponentPropsWithoutRef<'div'> {
	videoToDisplay: VideoCampagneApprentissage,
}

export function VideoFrame({ videoToDisplay, className }: VideoFrameProps) {
	const cookiesService = useDependency<CookiesService>('cookiesService');
	const [areYoutubeCookiesAccepted, setAreYoutubeCookiesAccepted] = useState(cookiesService.isServiceAllowed(YoutubeService.SERVICE_NAME));

	useEffect(function listenToCookieConsentChanges() {
		// FIXME (GAFI 16-05-2023): Dirty implementation, to rework ASAP
		function updateCookieSettings() {
			setAreYoutubeCookiesAccepted(cookiesService.isServiceAllowed(YoutubeService.SERVICE_NAME));
		}

		document.addEventListener('youtube_loaded', updateCookieSettings);
		document.addEventListener('youtube_added', updateCookieSettings);
		document.addEventListener('youtube_allowed', () => setAreYoutubeCookiesAccepted(true));
		document.addEventListener('youtube_disallowed', () => setAreYoutubeCookiesAccepted(false));

		return () => {
			document.removeEventListener('youtube_loaded', updateCookieSettings);
			document.removeEventListener('youtube_added', updateCookieSettings);
			document.removeEventListener('youtube_allowed', () => setAreYoutubeCookiesAccepted(true));
			document.removeEventListener('youtube_disallowed', () => setAreYoutubeCookiesAccepted(false));
		};
	}, [cookiesService]);


	return <div className={classNames(styles.video, className)}>
		{areYoutubeCookiesAccepted ? (
			<iframe
				width="326"
				height="180"
				src={`https://www.youtube-nocookie.com/embed/${videoToDisplay.videoId}`}
				title={videoToDisplay.titre}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className={styles.iframe}
			/>
		) : (
			<>
				<Image
					src={`${YOUTUBE_THUMBNAIL_URL}${videoToDisplay.videoId}/0.jpg`}
					alt={''}
					width="326"
					height="180"
					className={styles.placeholderThumbnail}
				/>
				<div className={styles.placeholderContainer}>
					<div className={styles.placeholderContent}>
						<p>
                            Cette vidéo est hébergée par <Link href="https://www.youtube.com/t/terms">
								<TextIcon
									icon="external-redirection"
									iconPosition="right"
									className={styles.linkToYoutubeTerms}
								>
									youtube.com
								</TextIcon>
							</Link>
						</p>
						<p>
                            En l’affichant, vous acceptez ses conditions d’utilisation et les potentiels cookies déposés
                            par ce site.
						</p>
						<ButtonComponent
							label={'Accepter les cookies'}
							onClick={acceptYoutubeCookies}
							appearance={'secondary'}
							className={styles.buttonAcceptCookies}
							icon={<Icon name="check-line"/>}
							iconPosition="right"
						/>
					</div>
				</div>
			</>
		)
		}
	</div>;
}

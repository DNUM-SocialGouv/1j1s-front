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
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

function acceptYoutubeCookies() {
	window.tarteaucitron.userInterface.respond(document.getElementById('youtubeAllowed'), true);
}

interface VideoFrameProps extends React.ComponentPropsWithoutRef<'div'> {
	videoToDisplay: VideoCampagneApprentissage,
}

export function VideoFrame({ videoToDisplay, className }: VideoFrameProps) {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');
	const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

	useEffect(function listenToCookieConsentChanges() {
		// FIXME (GAFI 16-05-2023): Dirty implementation, to rework ASAP
		function updateCookieSettings() {
			setAreCookiesAccepted(analyticsService.isConsentementCookieAutorisé('youtube'));
		}

		document.addEventListener('youtube_loaded', updateCookieSettings);
		document.addEventListener('youtube_added', updateCookieSettings);
		document.addEventListener('youtube_allowed', () => setAreCookiesAccepted(true));
		document.addEventListener('youtube_disallowed', () => setAreCookiesAccepted(false));

		return () => {
			document.removeEventListener('youtube_loaded', updateCookieSettings);
			document.removeEventListener('youtube_added', updateCookieSettings);
			document.removeEventListener('youtube_allowed', () => setAreCookiesAccepted(true));
			document.removeEventListener('youtube_disallowed', () => setAreCookiesAccepted(false));
		};
	}, [analyticsService]);


	return <div className={classNames(styles.video, className)}>
		{areCookiesAccepted ? (
		// <iframe
		// 	width="326"
		// 	height="180"
		// 	src={`https://www.youtube-nocookie.com/embed/${videoToDisplay.videoId}`}
		// 	title={videoToDisplay.titre}
		// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		// 	allowFullScreen
		// 	className={styles.iframe}
		// />
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<div videoID={videoToDisplay.videoId} width="326" height="180" className= 'youtube_player' theme="theme (dark | light)" rel="rel (1 | 0)" controls="controls (1 | 0)" showinfo="showinfo (1 | 0)" autoplay="autoplay (0 | 1)" mute="mute (0 | 1)" srcdoc="srcdoc" loop="loop (0 | 1)" loading="loading (0 | 1)" data-start="start" data-end="end"></div>
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
							appearance={'tertiary'}
							className={styles.buttonAcceptCookies}
							icon={<Icon className={styles.icon} name="check-line"/>}
							iconPosition="right"
						/>
					</div>
				</div>
			</>
		)
		}
	</div>;
}

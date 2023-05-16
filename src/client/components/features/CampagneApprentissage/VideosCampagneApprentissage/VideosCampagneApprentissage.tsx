import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { VideoFrame } from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideoFrame';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

import styles from './VideosCampagneApprentissage.module.scss';

interface VideosCampagneApprentissageProps extends React.HTMLAttributes<HTMLDivElement> {
	titre: string
	description: string
	videos: Array<VideoCampagneApprentissage>
}

export default function VideosCampagneApprentissage({ videos, titre, description, className }: VideosCampagneApprentissageProps) {
	const analyticsService = useDependency<AnalyticsService>('analyticsService');
	const [videoToDisplay, setVideoToDisplay] = useState(videos[0]);
	const [areCookiesAccepted, setAreCookiesAccepted] = useState(analyticsService.isConsentementCookieAutorisé('youtube'));

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

	function selectVideo(video: VideoCampagneApprentissage) {
		setVideoToDisplay(video);
		document.getElementById('titre-section-video')?.focus();
	}

	function getVideoButtonIcon(video: VideoCampagneApprentissage) {
		return videoToDisplay === video ?
			<Icon name="arrow-left"/> :
			<Icon name="play-circle"/>;
	}

	function openCookiesPanel() {
		window.tarteaucitron.userInterface.respond(document.getElementById('youtubeAllowed'), true);
	}

	return (
		<section className={classNames(styles.sectionVideos, className)}>
			<Container className={styles.container}>
				<h2 className={styles.titreSection} id="titre-section-video" tabIndex={-1}>{titre}</h2>
				<VideoFrame videoToDisplay={videoToDisplay} className={styles.video}/>
				<details className={styles.transcription}>
					<summary>Lire la transcription</summary>
					<p className={styles.content}>{videoToDisplay.transcription}</p>
				</details>
				<section className={styles.temoignage} aria-labelledby="description-video">
					<p className={styles.titreTemoignage} id="description-video">{description}</p>
					<ul className={styles.boutonsVideosList}>
						{
							videos.map((video, index) => (
								<li key={index}>
									<ButtonComponent
										label={video.titre}
										appearance={'tertiary'}
										onClick={() => {
											selectVideo(video);
										}}
										aria-current={videoToDisplay === video ? true : undefined}
										className={styles.titreVideoButton}
										icon={
											getVideoButtonIcon(video)
										}
										iconPosition="left"
									/>
								</li>
							))
						}
					</ul>
					<div className={styles.lienPlaylistContainer}>
						<Link href={'https://www.youtube.com/playlist?list=PLr4bjAdWwofltWnk3Ys1m-EhjuMaPAcbh'}
							  className={styles.lienPlaylist}>
							<TextIcon icon="external-redirection">Découvrir tous les témoignages</TextIcon>
						</Link>
					</div>
				</section>
			</Container>
		</section>
	);
}

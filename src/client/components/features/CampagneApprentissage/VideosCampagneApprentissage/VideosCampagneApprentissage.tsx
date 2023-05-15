import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

import styles from './VideosCampagneApprentissage.module.scss';

interface VideosCampagneApprentissageProps extends React.HTMLAttributes<HTMLDivElement> {
	titre: string
	description: string
	videos: Array<VideoCampagneApprentissage>
}

const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

export default function VideosCampagneApprentissage({ videos, titre, description, className }: VideosCampagneApprentissageProps) {
	const [videoToDisplay, setVideoToDisplay] = useState(videos[0]);
	const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

	function selectVideo(video: VideoCampagneApprentissage) {
		setVideoToDisplay(video);
		document.getElementById('titre-section-video')?.focus();
	}

	function getVideoButtonIcon(video: VideoCampagneApprentissage) {
		return videoToDisplay === video ?
			<Icon name="arrow-left"/> :
			<Icon name="play-circle"/>;
	}

	return (
		<section className={classNames(styles.videos, className)}>
			<Container className={styles.container}>
				<h2 className={styles.titreSection} id="titre-section-video" tabIndex={-1}>{titre}</h2>
				<div className={styles.video}>
					{ areCookiesAccepted ? (
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
								className={styles.videoThumbnail}
							/>
							<div className={styles.layoutCookiesNotAccepted}>
								<div className={styles.textContent}>
									<p>
										Cette vidéo est hébergée par <Link href="https://www.youtube.com/t/terms">
											<TextIcon icon="external-redirection" iconPosition="right" className={styles.linkToYoutubeTerms}>
												youtube.com
											</TextIcon>
										</Link>
									</p>
									<p>
										En l’affichant, vous acceptez ses conditions d’utilisation et les potentiels cookies déposés par ce site.
									</p>
									<ButtonComponent
										label={'Lancer la vidéo'}
										onClick={() => setAreCookiesAccepted(true)}
										appearance={'secondary'}
										className={styles.buttonLaunchVideo}
										icon={<Icon className={styles.icon} name="play-circle"/>}
										iconPosition="right"
									/>
								</div>
							</div>
						</>
					)
					}
				</div>
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
						<Link href={'https://www.youtube.com/playlist?list=PLr4bjAdWwofltWnk3Ys1m-EhjuMaPAcbh'} className={styles.lienPlaylist}>
							<TextIcon icon="external-redirection">Découvrir tous les témoignages</TextIcon>
						</Link>
					</div>
				</section>
			</Container>
		</section>
	);
}

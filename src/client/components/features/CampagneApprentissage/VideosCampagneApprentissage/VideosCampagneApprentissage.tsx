import React, { useState } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

import styles from './VideosCampagneApprentissage.module.scss';

interface VideosCampagneApprentissageProps {
	videos: Array<VideoCampagneApprentissage>
}

export default function VideosCampagneApprentissage({ videos }: VideosCampagneApprentissageProps) {
	const [videoToDisplay, setVideoToDisplay] = useState(videos[0]);

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
		<section className={styles.videos}>
			<Container className={styles.container}>
				<h2 className={styles.titreSection} id="titre-section-video" tabIndex={-1}>Ils ont fait le choix de l’apprentissage, pourquoi pas vous ?</h2>
				<div className={styles.video}>
					<iframe
						width="326"
						height="180"
						src={`https://www.youtube-nocookie.com/embed/${videoToDisplay.videoId}`}
						title={videoToDisplay.titre}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className={styles.iframe}
					/>
				</div>
				<details className={styles.transcription}>
					<summary>Lire la transcription</summary>
					<p className={styles.content}>{videoToDisplay.transcription}</p>
				</details>
				<section className={styles.temoignage} aria-labelledby="description-video">
					<p className={styles.titreTemoignage} id="description-video">Découvrez les témoignages d’Elyna, Céline, Romain et tous les autres !</p>
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

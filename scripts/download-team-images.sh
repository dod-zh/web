#!/bin/bash
# Script to download team images for DevOpsDays Zurich 2025

set -e

IMG_DIR="static/images/team"
mkdir -p "$IMG_DIR"

# Download images
curl -L -o "$IMG_DIR/martin-thalmann.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/martin-thalmann_hu35f8ee17544554440315f625da0a8252_21399_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/dirk-lehmann.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/dirk-lehmann_huc9292494ee46dd8d7cd17c0dfa7147a1_33522_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/romano-roth.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/romano-roth_hue750d8f331e85e44ebec56eb7d52fb45_63133_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/tobias-weinmann.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/tobias-weinmann_hu270e436f2ceb01ae12dd7a1a0fa00436_16257_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/selina-reist.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/selina-reist_hu7974fc0a15ab4affcd98da83852b315a_33759_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/flavio-monigatti.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/flavio-monigatti_hu12b92b250ecccf0f81fac6f50b4d30fd_14063_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/nadine-broghammer.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/nadine-broghammer_hu36698c305bb74119c6acb3df29492261_23923_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/isabel-schacher.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/isabel-schacher_huebbfad1edfa8e198fe68a27ac6a615ca_84487_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/jan-moser.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/jan-moser_hudcf205d0a3d75e4484d9edf1d4251602_28628_600x600_fit_q100_h2_lanczos.webp"
curl -L -o "$IMG_DIR/franziska-buehler.webp" "https://www.devopsdays.org/events/2025-zurich/organizers/franziska-buehler_hu885dad6e544b674480632b6dab303360_16566_600x600_fit_q100_h2_lanczos.webp"

echo "All images downloaded to $IMG_DIR"

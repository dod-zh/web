#!/bin/bash

# Download speaker images script
# This script downloads all speaker images from the DevOpsDays Zurich 2025 website

set -e  # Exit on any error

# Create speakers directory if it doesn't exist
mkdir -p static/images/speakers

# Change to the speakers directory
cd static/images/speakers

echo "Starting speaker image downloads..."

# Array of speakers with their image URLs
declare -A speakers=(
    ["adam-zieba"]="https://devopsdays.org/events/2025-zurich/speakers/adam-zieba_hud91d716389aea411213d04ffc93d0ab0_367991_600x600_fit_q100_h2_lanczos.webp"
    ["alexander-ptakhin"]="https://devopsdays.org/events/2025-zurich/speakers/alexander-ptakhin_hu37c861092439d14964cc2af6adc08fc0_1135592_600x600_fit_q100_h2_lanczos.webp"
    ["alina-liburkina"]="https://devopsdays.org/events/2025-zurich/speakers/alina-liburkina_hue81a374fcc016275dc32063224d20f16_444380_600x600_fit_q100_h2_lanczos.webp"
    ["alvaro-revuelta-m"]="https://devopsdays.org/events/2025-zurich/speakers/alvaro-revuelta-m_hub69844b0bb64e87c6867e69c9e4b1872_1176707_600x600_fit_q100_h2_lanczos_3.webp"
    ["antonio-alvino"]="https://devopsdays.org/events/2025-zurich/speakers/antonio-alvino_hua7f55da02b28dac77e3cbee741eb7212_2131040_600x600_fit_q100_h2_lanczos.webp"
    ["bertrand-delacretaz"]="https://devopsdays.org/events/2025-zurich/speakers/bertrand-delacretaz_huea98f9cfac1821b436e3abdd93a437ef_163370_600x600_fit_q100_h2_lanczos.webp"
    ["carmine-vassallo"]="https://devopsdays.org/events/2025-zurich/speakers/carmine-vassallo_hu869b94d5136a622111df52daaa5bf03a_1054274_600x600_fit_q100_h2_lanczos_3.webp"
    ["christina-kraus"]="https://devopsdays.org/events/2025-zurich/speakers/christina-kraus_hu19aba626475de09d8067bae4f8eaf7e9_259849_600x600_fit_q100_h2_lanczos.webp"
    ["daiany-palacios"]="https://devopsdays.org/events/2025-zurich/speakers/daiany-palacios_hu10a100c063ef6e85048d8bb708563cc8_398145_600x600_fit_q100_h2_lanczos.webp"
    ["daniel-raniz-raneland"]="https://devopsdays.org/events/2025-zurich/speakers/daniel-raniz-raneland_hucd65def00701dea60f397c98472cf2f9_168570_600x600_fit_q100_h2_lanczos.webp"
    ["darko-fabijan"]="https://devopsdays.org/events/2025-zurich/speakers/darko-fabijan_hu8f1efb9b6d7c64b3df8e826fd1d0b69c_16377_600x600_fit_q100_h2_lanczos.webp"
    ["dorota-parad"]="https://devopsdays.org/events/2025-zurich/speakers/dorota-parad_hu8efab5e36162329eaaed75dcc5635f0f_254370_600x600_fit_q100_h2_lanczos.webp"
    ["jonas-alder"]="https://devopsdays.org/events/2025-zurich/speakers/jonas-alder_hu720b99c185f3ceba8e7113a3d5c6f478_101237_600x600_fit_q100_h2_lanczos.webp"
    ["kamali-wickramage"]="https://devopsdays.org/events/2025-zurich/speakers/kamali-wickramage_hu3ab5954084f9c80afb02806659900d72_179863_600x600_fit_q100_h2_lanczos.webp"
    ["kenny-baas-schwegler"]="https://devopsdays.org/events/2025-zurich/speakers/kenny-baas-schwegler_hua72e4d6c395ed1719e4a515addf032c1_125636_600x600_fit_q100_h2_lanczos.webp"
    ["lena-fuhrimann"]="https://devopsdays.org/events/2025-zurich/speakers/lena-fuhrimann_hue720a758f4235ab2a97a2a7834a27690_1035885_600x600_fit_q100_h2_lanczos.webp"
    ["manisha-de"]="https://devopsdays.org/events/2025-zurich/speakers/manisha-de_hud652afe91590df2323500dff3481057f_242972_600x600_fit_q100_h2_lanczos.webp"
    ["marc-herren"]="https://devopsdays.org/events/2025-zurich/speakers/marc-herren_hu1107a27a19df4d74bd9cb3ba77ea1dbb_815079_600x600_fit_q100_h2_lanczos.webp"
    ["marc-sallin"]="https://devopsdays.org/events/2025-zurich/speakers/marc-sallin_hu97dbfb1fbb6f49a63a701f7b1634095b_301611_600x600_fit_q100_h2_lanczos.webp"
    ["marc-schuh"]="https://devopsdays.org/events/2025-zurich/speakers/marc-schuh_huabb84f84e8f1648af25fe6e3ae8cc719_1271261_600x600_fit_q100_h2_lanczos_3.webp"
    ["marcel-britsch"]="https://devopsdays.org/events/2025-zurich/speakers/marcel-britsch_hu510eac050ef3b249245532f210b8316a_259281_600x600_fit_q100_h2_lanczos.webp"
    ["marcelo-ancelmo"]="https://devopsdays.org/events/2025-zurich/speakers/marcelo-ancelmo_hud862104903f1d78b75b541c0d2b5c391_106287_600x600_fit_q100_h2_lanczos.webp"
    ["marco-goncalves"]="https://devopsdays.org/events/2025-zurich/speakers/marco-goncalves_huda9a7f3ca3a056a821bc68e9f979427d_135531_600x600_fit_q100_h2_lanczos.webp"
    ["oliver-zihler"]="https://devopsdays.org/events/2025-zurich/speakers/oliver-zihler_hu37ad3cf23f146140701bab0ceaf784e1_210287_600x600_fit_q100_h2_lanczos.webp"
    ["peter-farkas"]="https://devopsdays.org/events/2025-zurich/speakers/peter-farkas_hu60fa0aac15812e55689ed5ef14d4163f_264963_600x600_fit_q100_h2_lanczos_3.webp"
    ["philipp-moser"]="https://devopsdays.org/events/2025-zurich/speakers/philipp-moser_hu964eff7d5743d964908c9a9f3606845c_526756_600x600_fit_q100_h2_lanczos.webp"
    ["pia-wiedermayer"]="https://devopsdays.org/events/2025-zurich/speakers/pia-wiedermayer_huc6e760a65621da2867c39028f2b67a69_683472_600x600_fit_q100_h2_lanczos.webp"
    ["rabieh-fashwall"]="https://devopsdays.org/events/2025-zurich/speakers/rabieh-fashwall_hu2c5ce1321f740a3fdb62d67addac91bc_25070_600x600_fit_q100_h2_lanczos.webp"
    ["rasmus-lystrom"]="https://devopsdays.org/events/2025-zurich/speakers/rasmus-lystrom_hu9ae265c77328c2418b38ab7d799643df_22268_600x600_fit_q100_h2_lanczos.webp"
    ["sandra-czopek"]="https://devopsdays.org/events/2025-zurich/speakers/sandra-czopek_hua3db8e8a426b8a7f615563b6961cec8a_682531_600x600_fit_q100_h2_lanczos.webp"
    ["stefan-pezzei"]="https://devopsdays.org/events/2025-zurich/speakers/stefan-pezzei_hu888f85ddf712df1517aaaa5a1b9ac63c_69232_600x600_fit_q100_h2_lanczos.webp"
    ["thomas-krag"]="https://devopsdays.org/events/2025-zurich/speakers/thomas-krag_hu4c2c93d17ec8c570d9e110e185144dca_106482_600x600_fit_q100_h2_lanczos.webp"
    ["verena-traub"]="https://devopsdays.org/events/2025-zurich/speakers/verena-traub_hu28fa2278a6d641246412bd96b0f4dc09_1028233_600x600_fit_q100_h2_lanczos.webp"
)

# Counter for progress tracking
total=${#speakers[@]}
current=0

# Download each speaker image
for speaker in "${!speakers[@]}"; do
    current=$((current + 1))
    url="${speakers[$speaker]}"
    filename="${speaker}.webp"
    
    echo "[$current/$total] Downloading $speaker..."
    
    # Skip if file already exists
    if [ -f "$filename" ]; then
        echo "  ✓ $filename already exists, skipping"
        continue
    fi
    
    # Download with error handling
    if wget -q --timeout=30 --tries=3 -O "$filename" "$url"; then
        echo "  ✓ Successfully downloaded $filename"
    else
        echo "  ✗ Failed to download $filename from $url"
        # Remove partial file if download failed
        rm -f "$filename"
    fi
done

echo ""
echo "Download complete!"
echo "Downloaded images are in: $(pwd)"
echo "Total files: $(ls -1 *.webp 2>/dev/null | wc -l)/$total"

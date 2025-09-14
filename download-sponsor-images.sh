#!/bin/bash
# download-sponsor-images.sh
# Downloads sponsor images for DevOpsDays CH website

set -e

IMG_DIR="static/images/sponsors"
mkdir -p "$IMG_DIR"

# Gold Sponsors
curl -L -o "$IMG_DIR/infomaniak.webp" "https://www.devopsdays.org/sponsors/i/infomaniak_hu2178cb532cc9b3d0f6b5e745916bc844_5483_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/vshn.webp" "https://www.devopsdays.org/sponsors/v/vshn_hu86490942a3ed1de7f7ba164e2a5bba09_103327_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/bit.webp" "https://www.devopsdays.org/sponsors/b/bit_hu7784a2e602ee3b50785bf7d188685c8d_128409_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/redgate.webp" "https://www.devopsdays.org/sponsors/r/redgate_hu21184cb7f510c58d773131f1789c8e29_10843_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/elastic.webp" "https://www.devopsdays.org/sponsors/e/elastic_hua08669c77d4651655581b1964d7cb8ba_47282_300x300_fit_q100_h2_lanczos_3.webp"

# Silver Sponsors
curl -L -o "$IMG_DIR/infometis.webp" "https://www.devopsdays.org/sponsors/i/infometis_hu8365a2b28cf59ad0d2c481d0f93594d3_36118_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/zkb.webp" "https://www.devopsdays.org/sponsors/z/zkb_hu1d59ebacbf385d2df81245f6cf22159d_5101_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/4data.webp" "https://www.devopsdays.org/sponsors/4/4data_hu7e4378b4668cb4d0eef99d7886a6ce7b_20836_300x300_fit_q100_h2_lanczos_3.webp"

# Evening Event, Coffee, Meal Sponsors
curl -L -o "$IMG_DIR/cloudscalech.webp" "https://www.devopsdays.org/sponsors/c/cloudscalech_hu72be86bf6c0f6ebd42e60867ecc4819f_268031_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/exoscale.webp" "https://www.devopsdays.org/sponsors/e/exoscale_huf92f8ad46c1dea575a230b8ce3b62b8b_77122_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/eficode.webp" "https://www.devopsdays.org/sponsors/e/eficode_hua5ad644e5a7769e048e828ea26799ee5_42621_300x300_fit_q100_h2_lanczos_3.webp"

# Bronze Sponsors
curl -L -o "$IMG_DIR/amanox.webp" "https://www.devopsdays.org/sponsors/a/amanox_hu9f2d648ec18740a79e8afd437b0141db_10910_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/cognizant.webp" "https://www.devopsdays.org/sponsors/c/cognizant_hu14f8e0e60bfd0b3857ccd4eb0a761049_162741_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/dbi-services.webp" "https://www.devopsdays.org/sponsors/d/dbi-services_huedfe13b9e124f3e7791f32fa04d13fa7_74802_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/checkmarx.webp" "https://www.devopsdays.org/sponsors/c/checkmarx_huc8eb251d653289998bdfcad508fcb812_15014_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/infiniroot.webp" "https://www.devopsdays.org/sponsors/i/infiniroot_huf18e13816dd4c1c37ee63fa96b76cf7a_12458_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/ciklum.webp" "https://www.devopsdays.org/sponsors/c/ciklum_hu60c88307efacb565c9b692defd0fe588_295443_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/cloudbees.webp" "https://www.devopsdays.org/sponsors/c/cloudbees_hu9940ffe1d2a725a3b616b5fba0925e50_52727_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/datastore.webp" "https://www.devopsdays.org/sponsors/d/datastore_hue8cc994a9f053175f8584f9d2b373220_6612_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/zesty.webp" "https://www.devopsdays.org/sponsors/z/zesty_hu9a3a132770ff25853d8439efbfd635c7_18413_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/couchbase.webp" "https://www.devopsdays.org/sponsors/c/couchbase_hu245d567b8d8bed67a5a07037b901b437_10847_300x300_fit_q100_h2_lanczos_3.webp"

# Community Sponsors
curl -L -o "$IMG_DIR/powercoders.webp" "https://www.devopsdays.org/sponsors/p/powercoders_hu63748bee73c740d85044060a9ff07ffd_11859_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/belikegrace.webp" "https://www.devopsdays.org/sponsors/b/belikegrace_hua3ba80fb8107a0d19faa321f74ed385e_33193_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/girlscodetoo.webp" "https://www.devopsdays.org/sponsors/g/girlscodetoo_hu044518e256c888532ebe237052d2cdef_12425_300x300_fit_q100_h2_lanczos_3.webp"

# Partner Sponsors
curl -L -o "$IMG_DIR/businessmap.webp" "https://www.devopsdays.org/sponsors/b/businessmap_huac6753626def4f06ad1df24823f79a15_31094_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/hostpoint.webp" "https://www.devopsdays.org/sponsors/h/hostpoint_huebf9b7fc7be582c97b10f1b21717871d_5730_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/digicomp.webp" "https://www.devopsdays.org/sponsors/d/digicomp_hu9d32f6700ede694cd25f69612b1006ab_30361_300x300_fit_q100_h2_lanczos_3.webp"
curl -L -o "$IMG_DIR/puresivefilms.webp" "https://www.devopsdays.org/sponsors/p/puresivefilms_hu657bc641d1be40ae6445e8614872d553_25506_300x300_fit_q100_h2_lanczos_3.webp"

echo "All sponsor images downloaded to $IMG_DIR"

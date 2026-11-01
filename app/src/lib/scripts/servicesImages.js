// Images are imported as enhanced-img "Picture" objects (AVIF/WebP/original at several widths),
// rendered with <enhanced:img src={...}>. Widths are capped at the source size (withoutEnlargement).
// Import paths must match filenames exactly (case-sensitive on Linux build servers).
import treeFelling from '$lib/images/services/TreeFelling.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import pollarding from '$lib/images/services/Pollarding.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import crownReduction from '$lib/images/services/CrownReduction.webp?enhanced&w=1600;1200;800;480&withoutEnlargement';
import crownThinning from '$lib/images/services/CrownThinning.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import crownLifting from '$lib/images/services/CrownLifting.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import treePruning from '$lib/images/services/TreePruning.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import treePlanting from '$lib/images/services/TreePlanting.png?enhanced&w=1600;1200;800;480&withoutEnlargement';
import hedgeTrimming from '$lib/images/services/HedgeTrimming.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import topiary from '$lib/images/services/ShrubTopiary.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import stumpGrinding from '$lib/images/services/StumpGrinding.png?enhanced&w=1600;1200;800;480&withoutEnlargement';
import fencing from '$lib/images/services/Fencing.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import gardenClearance from '$lib/images/services/GardenClearance.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import treeSurvey from '$lib/images/services/treeSurvey.webp?enhanced&w=1600;1200;800;480&withoutEnlargement';
import commercialMaintenance from '$lib/images/services/CommercialMaintenance.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import siteClearance from '$lib/images/services/SiteClearance.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';
import emergencyWorks from '$lib/images/services/EmergencyTreeWork.webp?enhanced&w=1600;1200;800;480&withoutEnlargement';
import deadwoodRemoval from '$lib/images/services/DeadwoodRemoval.jpg?enhanced&w=1600;1200;800;480&withoutEnlargement';

export const servicesImages = {
  treeFelling,
  pollarding,
  crownReduction,
  crownThinning,
  crownLifting,
  treePruning,
  treePlanting,
  hedgeTrimming,
  topiary,
  emergencyWorks,
  stumpGrinding,
  fencing,
  gardenClearance,
  treeSurvey,
  commercialMaintenance,
  siteClearance,
  deadwoodRemoval
};

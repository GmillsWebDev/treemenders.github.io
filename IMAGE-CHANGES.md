# Image changes (Nov 2026): revert notes

Temporary record of the switch from stock photos to the client's own photos. Delete this file (and `app/src/lib/images/services/replaced/`) once the new images are signed off.

## What changed

The client's phone photos were rotated upright, stripped of all metadata (including GPS location), resized to 2400px on the long edge, and renamed. The stock images they replaced were moved, unchanged, to `app/src/lib/images/services/replaced/`.

| Service | New image | Focus | Previous (stock) image | Previous alt text |
| --- | --- | --- | --- | --- |
| Tree Felling | `TreeFelling.jpg` | center | `replaced/TreeFelling.jpg` | A tree surgeon using a chainsaw to cut down a tree, they are wearing orange, high vis safety gear and a helmet with a face shield. |
| Pollarding | `Pollarding.jpg` | center 30% | `replaced/Pollarding2.jpg` | Rows of pollarded trees in a park cast long shadows on the ground under clear blue sky. |
| Crown Lifting | `CrownLifting.jpg` | center 55% | `replaced/CrownLifting.webp` | Sunny park with mature trees and open grassy space. |
| Deadwood Removal | `DeadwoodRemoval.jpg` | center 35% | `images/chainsaw2.webp` (still used by the About section, not moved) | Tree Removal |
| Hedge Trimming & Shaping | `HedgeTrimming.jpg` | center 40% | `replaced/HedgeTrimming2.webp` | Trimming the top of a hedge with an electric hedge cutter. |
| Shrub & Topiary Care | `ShrubTopiary.jpg` (stand-in: sleeper wall + hedge) | center | `replaced/Topiary.jpg` | Trees and hedges in a park or large garden that have been shaped into cones and other geometric shapes. |
| Fencing | `Fencing.jpg` | center | `replaced/Fencing.jpg` | A white picket fence running along a garden. |
| Site Clearance | `SiteClearance.jpg` | center | `replaced/GardenWaste.jpg` | Garden Waste Clearance |
| Garden Clearance | `GardenClearance.jpg` | center 60% | `replaced/GardenClearance.jpg` | Garden Clearance |
| Crown Thinning | `CrownThinning.jpg` | center 20% | `replaced/CrownThinning.jpg` | Treemenders arborist trims high tree branch near home using chainsaw and safety gear, ensuring safe, professional tree care. |

**Privacy (reviewed at full resolution):**
- `Fencing.jpg`: house number was readable and has been blurred (feathered).
- `CrownThinning.jpg`: vehicle number plate was already blurred in the supplied photo.
- No other readable house numbers, number plates, signage or people in any of the new photos.
- The front of a house is recognisable in `Fencing.jpg`, `GardenClearance.jpg`, `CrownThinning.jpg` and `ShrubTopiary.jpg`; `CrownLifting.jpg`, `Pollarding.jpg` and `HedgeTrimming.jpg` show houses or a street in the background. Fine to publish if the client has the homeowners' OK.

## How to revert one service

1. Move the stock file back: `git mv app/src/lib/images/services/replaced/<file> app/src/lib/images/services/<file>`. If a new photo has the same name (`TreeFelling.jpg`, `Fencing.jpg`, `GardenClearance.jpg`, `CrownThinning.jpg`), rename or delete the new one first.
2. In `app/src/lib/scripts/servicesImages.js`, point that service's import back at the old filename, keeping the `?enhanced&w=...` query. Site Clearance used the key `gardenWaste` (file `GardenWaste.jpg`). Deadwood Removal used `chainsaw` (`$lib/images/images/chainsaw2.webp`).
3. In `app/src/lib/scripts/services.js`, restore the `alt` from the table above, remove the `imageFocus` line, and for Site Clearance / Deadwood Removal set `image:` back to the old key.

To revert everything at once, check out the pre-change versions of `servicesImages.js`, `services.js` and the `images/services/` folder from git.

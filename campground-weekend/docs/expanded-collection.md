# Expanded campground collection and discovery-first explorer

October 27, 2026: collection expanded from 23 to 50 published Wisconsin records. Nineteen additional public parks and eight private campgrounds/resorts add Lake Superior, Chippewa Valley, Mississippi River, St. Croix Valley, Driftless and central Wisconsin coverage. Each new record links operator evidence, separates verified facts from unknown fields, and makes no firsthand-stay, price or live-availability claim.

Forty-eight of the fifty records have sourced approximate locations. The two Wisconsin Dells private records without verified coordinates remain searchable and filterable in the results. No map pin is fabricated. Public coordinates use the published park location; five private coordinates use U.S. Census address-range matches and one uses the operator's published business location. These are not campsite or navigable-entrance claims.

The home page now places the interactive explorer immediately after a compact real-photo banner. The directory begins with the same search and filters. The map opens when it enters the viewport, groups nearby markers by zoom, and links the result list to individual map popups. Filters work locally by name/region/county/verified amenity, camping style, public/private campground, region, specific amenity and recorded pet policy. Unknown fields are never treated as a negative claim. Search terms are not sent to a geocoder.

The real Unsplash banner remains. REI links remain disclosed. Newsletter, analytics and ads remain off. Privacy copy reflects automatic map tile loading when the map enters view. New private campground profiles use the operator's booking route rather than the statewide DNR booking label.

## Added records

| Campground | Region | Evidence | Map location |
|---|---|---|---|
| Amnicon Falls State Park | Lake Superior country | [Operator](https://dnr.wisconsin.gov/topic/parks/amnicon/recreation/camping) | Sourced approximate location |
| Copper Falls State Park | Lake Superior country | [Operator](https://dnr.wisconsin.gov/topic/parks/copperfalls/recreation/camping) | Sourced approximate location |
| Pattison State Park | Lake Superior country | [Operator](https://dnr.wisconsin.gov/topic/parks/pattison/recreation/camping) | Sourced approximate location |
| Big Bay State Park | Lake Superior country | [Operator](https://dnr.wisconsin.gov/topic/parks/bigbay/recreation/camping) | Sourced approximate location |
| Brunet Island State Park | Chippewa Valley | [Operator](https://dnr.wisconsin.gov/topic/parks/brunetisland/recreation/camping) | Sourced approximate location |
| Council Grounds State Park | Northwoods | [Operator](https://dnr.wisconsin.gov/topic/parks/councilgrounds/recreation/camping) | Sourced approximate location |
| Lake Wissota State Park | Chippewa Valley | [Operator](https://dnr.wisconsin.gov/topic/parks/lakewissota/recreation/camping) | Sourced approximate location |
| Perrot State Park | Mississippi River country | [Operator](https://dnr.wisconsin.gov/topic/parks/perrot/recreation/camping) | Sourced approximate location |
| Wyalusing State Park | Mississippi River country | [Operator](https://dnr.wisconsin.gov/topic/parks/wyalusing/recreation/camping) | Sourced approximate location |
| Nelson Dewey State Park | Mississippi River country | [Operator](https://dnr.wisconsin.gov/topic/parks/nelsondewey/recreation/camping) | Sourced approximate location |
| Merrick State Park | Mississippi River country | [Operator](https://dnr.wisconsin.gov/topic/parks/merrick/recreation/camping) | Sourced approximate location |
| Willow River State Park | St. Croix Valley | [Operator](https://dnr.wisconsin.gov/topic/parks/willowriver/recreation/camping) | Sourced approximate location |
| Interstate Park — Wisconsin | St. Croix Valley | [Operator](https://dnr.wisconsin.gov/topic/parks/interstate/recreation/camping) | Sourced approximate location |
| Wildcat Mountain State Park | Driftless country | [Operator](https://dnr.wisconsin.gov/topic/parks/wildcat/recreation/camping) | Sourced approximate location |
| Mill Bluff State Park | Central Wisconsin | [Operator](https://dnr.wisconsin.gov/topic/parks/millbluff/recreation/camping) | Sourced approximate location |
| Roche-A-Cri State Park | Central Wisconsin | [Operator](https://dnr.wisconsin.gov/topic/parks/rocheacri/recreation/camping) | Sourced approximate location |
| Tower Hill State Park | Driftless country | [Operator](https://dnr.wisconsin.gov/topic/parks/towerhill/recreation/camping) | Sourced approximate location |
| Straight Lake State Park | St. Croix Valley | [Operator](https://dnr.wisconsin.gov/topic/parks/straightlake/recreation/camping) | Sourced approximate location |
| Richard Bong State Recreation Area | Southern Wisconsin | [Operator](https://dnr.wisconsin.gov/topic/parks/richardbong/recreation/camping) | Sourced approximate location |
| Jellystone Park Caledonia | Southern Wisconsin | [Operator](https://jellystone-caledonia.com/how-to-book) | Sourced approximate location |
| Jellystone Park Warrens | Central Wisconsin | [Operator](https://www.campjellystone.com/wisconsin/jellystone-park-warrens/ways-to-stay) | Sourced approximate location |
| Jellystone Park Wisconsin Dells | Dells & Baraboo | [Operator](https://www.campjellystone.com/wisconsin/jellystone-park-wisconsin-dells/ways-to-stay) | Not yet verified; list only |
| Fox Hill RV Resort | Dells & Baraboo | [Operator](https://foxhillrvresort.com/rv-park-in-baraboo-wi/) | Sourced approximate location |
| Stoney Creek RV Resort | Chippewa Valley | [Operator](https://www.stoneycreekrvresort.com/) | Sourced approximate location |
| O’Neil Creek Campground | Chippewa Valley | [Operator](https://oneilcreek.com/our-campground/map-policies/) | Sourced approximate location |
| Door County KOA Holiday | Door County | [Operator](https://koa.com/campgrounds/door-county/) | Sourced approximate location |
| Wisconsin Dells KOA Holiday | Dells & Baraboo | [Operator](https://koa.com/campgrounds/wisconsin-dells/) | Not yet verified; list only |

## Validation

Production build: 78 HTML pages and 50 campground profiles. Astro check reports zero errors, warnings or hints. The HTML audit resolves all internal links/assets and confirms the production origin and indexing boundary. Ten representative page/viewport combinations at 1440 and 390 pixels passed with zero detected WCAG A/AA violations, horizontal overflow, broken images or runtime errors. Explorer behavior checks cover all 50 results, 48 represented locations, five Door County matches, eight private campgrounds, six verified-pool matches, grouped-marker zoom, result-to-popup navigation, Enter-key behavior, shared filter links, reset, empty results and map-tile failure while retaining all 50 records. The two unpinned glamping records remain filterable. No newsletter, analytics or ad requests were observed. See expanded-explorer-results.json.

The map panel starts about 590 pixels from the top of the desktop homepage and 704 pixels on the mobile homepage in the 1000-pixel test viewports, directly after the compact photographic introduction and filter controls. The directory introduces the explorer without a large banner ahead of it.

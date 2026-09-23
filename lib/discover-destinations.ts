import { DiscoverDestination } from "./types";

/**
 * Mock destinations reachable from the New York City region, used to
 * populate /discover and /adventure/[id]. Replace with a real
 * recommendation source in a later phase — for now every field is
 * hand-authored placeholder data.
 *
 * Phase 3 note: each destination's optional `detail` object holds the
 * richer data the adventure detail page needs (match breakdown, trails,
 * getting there, stay options, cost breakdown, weather). It lives on the
 * same record as the Phase 2 fields so there's one destination object per
 * id, not a second parallel dataset.
 */
export const discoverDestinations: DiscoverDestination[] = [
  {
    id: "bear-mountain-state-park",
    name: "Bear Mountain State Park",
    region: "Hudson Highlands, NY",
    shortDescription:
      "A classic first hike with summit views over the Hudson, plus a lake and picnic areas for a slower day.",
    activities: ["hiking", "camping"],
    difficulty: "moderate",
    estimatedTravelTimeMinutes: 70,
    transportationOptions: ["car", "no-car"],
    carFreeFriendly: true,
    estimatedTripCost: 70,
    trailDistanceMiles: 4.5,
    rating: 4.6,
    adventureMatchScore: 94,
    imageGradient: "trail-1",
    detail: {
      matchBreakdown: {
        accessibility: 96,
        budgetFit: 94,
        activityMatch: 96,
        difficultyMatch: 90,
        travelTime: 94,
      },
      matchSummary:
        "Great match for a moderate hike close to the city, with train access and a lake to cool off in afterward.",
      trails: [
        {
          id: "major-welch-trail",
          name: "Major Welch Trail",
          distanceMiles: 2.6,
          durationMinutes: 120,
          elevationGainFeet: 1140,
          difficulty: "moderate",
          routeType: "Loop",
          description:
            "Steep but short climb straight up Bear Mountain, rewarded with wide Hudson River views from the summit.",
        },
        {
          id: "perkins-memorial-trail",
          name: "Perkins Memorial Trail",
          distanceMiles: 4.1,
          durationMinutes: 150,
          elevationGainFeet: 900,
          difficulty: "easy",
          routeType: "Out & Back",
          description:
            "A gentler carriage-road alternative to the summit for a more relaxed pace.",
        },
        {
          id: "appalachian-trail-loop",
          name: "Appalachian Trail Loop",
          distanceMiles: 3.8,
          durationMinutes: 140,
          elevationGainFeet: 1050,
          difficulty: "moderate",
          routeType: "Loop",
          description:
            "A popular Appalachian Trail segment stitched together with local connector paths.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 70,
          parkingInfo:
            "Large lot at the inn; fills by 10am on weekends. $10 parking fee.",
        },
        publicTransit: {
          steps: [
            "NYC Grand Central",
            "Metro-North Hudson Line to Peekskill",
            "Seasonal shuttle to Bear Mountain",
          ],
          travelTimeMinutes: 100,
          lastMileInfo:
            "A weekend shuttle connects the Peekskill station directly to the park entrance.",
        },
      },
      stayOptions: [
        {
          id: "bear-mountain-inn",
          name: "Bear Mountain Inn",
          type: "Cabin",
          nightlyCost: 180,
          distanceFromTrailMiles: 0.2,
          description:
            "Historic lakeside inn steps from the main trailhead, with lake-view rooms.",
        },
        {
          id: "anthony-wayne-campground",
          name: "Anthony Wayne Campground",
          type: "Campground",
          nightlyCost: 30,
          distanceFromTrailMiles: 3.5,
          description:
            "First-come tent sites in neighboring Harriman State Park.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 25 },
        { label: "Camping / Lodging", amount: 20 },
        { label: "Food", amount: 20 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 62, condition: "Partly cloudy" },
        { day: "Saturday", tempF: 58, condition: "Light rain" },
        { day: "Sunday", tempF: 64, condition: "Sunny" },
      ],
    },
  },
  {
    id: "harriman-state-park",
    name: "Harriman State Park",
    region: "Southfields, NY",
    shortDescription:
      "Sprawling trail network with quiet lakes — easy to build a route from a short loop to an all-day traverse.",
    activities: ["hiking", "camping"],
    difficulty: "moderate",
    estimatedTravelTimeMinutes: 75,
    transportationOptions: ["car", "no-car"],
    carFreeFriendly: true,
    estimatedTripCost: 65,
    trailDistanceMiles: 6.2,
    rating: 4.5,
    adventureMatchScore: 90,
    imageGradient: "trail-2",
    detail: {
      matchBreakdown: {
        accessibility: 92,
        budgetFit: 90,
        activityMatch: 92,
        difficultyMatch: 86,
        travelTime: 90,
      },
      matchSummary:
        "Good fit if you want room to roam — an easy train ride out, with trails for almost any pace.",
      trails: [
        {
          id: "pine-meadow-loop",
          name: "Pine Meadow Loop",
          distanceMiles: 6.2,
          durationMinutes: 180,
          elevationGainFeet: 980,
          difficulty: "moderate",
          routeType: "Loop",
          description:
            "A full-day loop past Pine Meadow Lake with a mix of woods and open ridgeline.",
        },
        {
          id: "lake-skannatati-trail",
          name: "Lake Skannatati Trail",
          distanceMiles: 3.5,
          durationMinutes: 100,
          elevationGainFeet: 400,
          difficulty: "easy",
          routeType: "Loop",
          description:
            "An easy lakeside loop, good for a half-day or a warm-up before a longer hike.",
        },
        {
          id: "stony-brook-trail",
          name: "Stony Brook Trail",
          distanceMiles: 5.0,
          durationMinutes: 150,
          elevationGainFeet: 850,
          difficulty: "moderate",
          routeType: "Point to Point",
          description:
            "Follows Stony Brook through varied terrain — plan a car shuttle or out-and-back.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 75,
          parkingInfo: "Multiple trailhead lots throughout the park, mostly free.",
        },
        publicTransit: {
          steps: [
            "NYC Port Authority",
            "Short Line bus to Sloatsburg",
            "10–15 min walk to the Reeves Brook trailhead",
          ],
          travelTimeMinutes: 110,
          lastMileInfo:
            "The bus stop is a short, flat walk from one of the main trailheads.",
        },
      },
      stayOptions: [
        {
          id: "beaver-pond-campground",
          name: "Beaver Pond Campground",
          type: "Campground",
          nightlyCost: 28,
          distanceFromTrailMiles: 1.0,
          description:
            "Quiet tent sites near Lake Welch, close to several trailheads.",
        },
        {
          id: "stony-point-budget-inn",
          name: "Stony Point Budget Inn",
          type: "Budget lodging",
          nightlyCost: 95,
          distanceFromTrailMiles: 6.0,
          description: "Simple roadside motel for a no-frills basecamp.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 20 },
        { label: "Camping / Lodging", amount: 20 },
        { label: "Food", amount: 20 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 63, condition: "Partly cloudy" },
        { day: "Saturday", tempF: 59, condition: "Light rain" },
        { day: "Sunday", tempF: 65, condition: "Sunny" },
      ],
    },
  },
  {
    id: "breakneck-ridge",
    name: "Breakneck Ridge",
    region: "Cold Spring, NY",
    shortDescription:
      "Steep scrambles and near-constant Hudson River views — the region's most rewarded workout.",
    activities: ["hiking"],
    difficulty: "hard",
    estimatedTravelTimeMinutes: 90,
    transportationOptions: ["car", "no-car"],
    carFreeFriendly: true,
    estimatedTripCost: 45,
    trailDistanceMiles: 3.7,
    rating: 4.7,
    adventureMatchScore: 88,
    imageGradient: "trail-3",
    detail: {
      matchBreakdown: {
        accessibility: 90,
        budgetFit: 95,
        activityMatch: 82,
        difficultyMatch: 78,
        travelTime: 95,
      },
      matchSummary:
        "A strong match if you're after a short, hard workout with big views, easily reached without a car.",
      trails: [
        {
          id: "breakneck-ridge-trail",
          name: "Breakneck Ridge Trail",
          distanceMiles: 3.7,
          durationMinutes: 180,
          elevationGainFeet: 1420,
          difficulty: "hard",
          routeType: "Loop",
          description:
            "Steep rock scrambles right from the trailhead, with sweeping Hudson views the entire way up.",
        },
        {
          id: "breakneck-sugarloaf-connector",
          name: "Breakneck–Sugarloaf Connector",
          distanceMiles: 5.2,
          durationMinutes: 240,
          elevationGainFeet: 1900,
          difficulty: "hard",
          routeType: "Point to Point",
          description:
            "Extends the classic climb over Sugarloaf Mountain for a longer, harder day.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 90,
          parkingInfo:
            "Small roadside lot fills by 8am on weekends; overflow lot 0.3 mi south.",
        },
        publicTransit: {
          steps: [
            "NYC Grand Central",
            "Metro-North Hudson Line to Breakneck Ridge (seasonal weekend stop)",
          ],
          travelTimeMinutes: 95,
          lastMileInfo:
            "The trailhead is directly across the tracks from the platform.",
        },
      },
      stayOptions: [
        {
          id: "hudson-house-cold-spring",
          name: "Hudson House Cold Spring",
          type: "Budget lodging",
          nightlyCost: 160,
          distanceFromTrailMiles: 1.5,
          description: "Walkable riverside inn in the village of Cold Spring.",
        },
        {
          id: "fahnestock-campground",
          name: "Fahnestock State Park Campground",
          type: "Campground",
          nightlyCost: 22,
          distanceFromTrailMiles: 8.0,
          description: "Family-friendly tent sites a short drive north.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 20 },
        { label: "Camping / Lodging", amount: 0 },
        { label: "Food", amount: 20 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 60, condition: "Windy" },
        { day: "Saturday", tempF: 57, condition: "Light rain" },
        { day: "Sunday", tempF: 63, condition: "Sunny" },
      ],
    },
  },
  {
    id: "minnewaska-state-park",
    name: "Minnewaska State Park Preserve",
    region: "Kerhonkson, NY",
    shortDescription:
      "Sky-blue lakes and cliffside carriage roads through the Shawangunk Ridge — beginner-friendly and scenic.",
    activities: ["hiking"],
    difficulty: "easy",
    estimatedTravelTimeMinutes: 110,
    transportationOptions: ["car"],
    carFreeFriendly: false,
    estimatedTripCost: 80,
    trailDistanceMiles: 4.5,
    rating: 4.6,
    adventureMatchScore: 78,
    imageGradient: "trail-1",
    detail: {
      matchBreakdown: {
        accessibility: 70,
        budgetFit: 75,
        activityMatch: 85,
        difficultyMatch: 90,
        travelTime: 70,
      },
      matchSummary:
        "Solid choice for an easy, scenic day — you'll want a car to get there.",
      trails: [
        {
          id: "lake-minnewaska-carriage-loop",
          name: "Lake Minnewaska Carriage Loop",
          distanceMiles: 4.5,
          durationMinutes: 120,
          elevationGainFeet: 300,
          difficulty: "easy",
          routeType: "Loop",
          description:
            "A flat, scenic loop around the sky lake with cliffside overlooks the whole way.",
        },
        {
          id: "awosting-falls-trail",
          name: "Awosting Falls Trail",
          distanceMiles: 3.0,
          durationMinutes: 90,
          elevationGainFeet: 250,
          difficulty: "easy",
          routeType: "Out & Back",
          description: "A short, easy walk to one of the park's prettiest waterfalls.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 110,
          parkingInfo: "Pay lot at the main entrance, $10 per vehicle.",
        },
      },
      stayOptions: [
        {
          id: "minnewaska-lodge",
          name: "Minnewaska Lodge",
          type: "Cabin",
          nightlyCost: 210,
          distanceFromTrailMiles: 2.0,
          description: "Eco-friendly lodge just outside the park entrance.",
        },
        {
          id: "sams-point-camping-area",
          name: "Sam's Point Camping Area",
          type: "Campground",
          nightlyCost: 25,
          distanceFromTrailMiles: 5.0,
          description: "Primitive, backcountry-style sites near Sam's Point.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 30 },
        { label: "Camping / Lodging", amount: 25 },
        { label: "Food", amount: 20 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 61, condition: "Sunny" },
        { day: "Saturday", tempF: 60, condition: "Partly cloudy" },
        { day: "Sunday", tempF: 66, condition: "Sunny" },
      ],
    },
  },
  {
    id: "mohonk-preserve",
    name: "Mohonk Preserve",
    region: "New Paltz, NY",
    shortDescription:
      "Rock-climbing meccas and quiet carriage roads beneath the Mohonk Mountain House towers.",
    activities: ["hiking"],
    difficulty: "moderate",
    estimatedTravelTimeMinutes: 115,
    transportationOptions: ["car"],
    carFreeFriendly: false,
    estimatedTripCost: 90,
    trailDistanceMiles: 5.0,
    rating: 4.8,
    adventureMatchScore: 82,
    imageGradient: "trail-2",
    detail: {
      matchBreakdown: {
        accessibility: 72,
        budgetFit: 70,
        activityMatch: 85,
        difficultyMatch: 88,
        travelTime: 95,
      },
      matchSummary:
        "A comfortable match for a moderate hike with a premium stay option, if you don't mind driving.",
      trails: [
        {
          id: "mohonk-lake-carriage-loop",
          name: "Mohonk Lake Carriage Loop",
          distanceMiles: 5.0,
          durationMinutes: 150,
          elevationGainFeet: 600,
          difficulty: "moderate",
          routeType: "Loop",
          description:
            "Wide, well-graded carriage roads circling the lake beneath the Mountain House.",
        },
        {
          id: "sky-top-tower-trail",
          name: "Sky Top Tower Trail",
          distanceMiles: 3.2,
          durationMinutes: 110,
          elevationGainFeet: 700,
          difficulty: "moderate",
          routeType: "Out & Back",
          description:
            "Climbs to the historic Sky Top stone tower for 360-degree Shawangunk views.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 115,
          parkingInfo: "Day-use lot fee is $25 per vehicle on weekends.",
        },
      },
      stayOptions: [
        {
          id: "mohonk-mountain-house",
          name: "Mohonk Mountain House",
          type: "Cabin",
          nightlyCost: 450,
          distanceFromTrailMiles: 0.1,
          description:
            "Historic Victorian resort inside the preserve — a splurge option right on the trail.",
        },
        {
          id: "new-paltz-hostel",
          name: "New Paltz Hostel",
          type: "Budget lodging",
          nightlyCost: 60,
          distanceFromTrailMiles: 4.0,
          description: "Budget dorm and private rooms in downtown New Paltz.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 30 },
        { label: "Camping / Lodging", amount: 35 },
        { label: "Food", amount: 20 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 60, condition: "Sunny" },
        { day: "Saturday", tempF: 59, condition: "Partly cloudy" },
        { day: "Sunday", tempF: 65, condition: "Sunny" },
      ],
    },
  },
  {
    id: "catskill-mountains",
    name: "Catskill Mountains",
    region: "Catskill Park, NY",
    shortDescription:
      "High Peaks, waterfalls and backcountry camping for a proper weekend away from the city.",
    activities: ["hiking", "camping"],
    difficulty: "hard",
    estimatedTravelTimeMinutes: 140,
    transportationOptions: ["car"],
    carFreeFriendly: false,
    estimatedTripCost: 120,
    trailDistanceMiles: 8.0,
    rating: 4.5,
    adventureMatchScore: 75,
    imageGradient: "trail-3",
    detail: {
      matchBreakdown: {
        accessibility: 60,
        budgetFit: 65,
        activityMatch: 90,
        difficultyMatch: 70,
        travelTime: 90,
      },
      matchSummary:
        "Best for a longer, harder weekend away — budget and travel time are the trade-offs.",
      trails: [
        {
          id: "kaaterskill-falls-trail",
          name: "Kaaterskill Falls Trail",
          distanceMiles: 2.4,
          durationMinutes: 90,
          elevationGainFeet: 500,
          difficulty: "moderate",
          routeType: "Out & Back",
          description:
            "A short, steep hike to one of New York's tallest waterfalls.",
        },
        {
          id: "slide-mountain-trail",
          name: "Slide Mountain Trail",
          distanceMiles: 6.5,
          durationMinutes: 300,
          elevationGainFeet: 2000,
          difficulty: "hard",
          routeType: "Out & Back",
          description:
            "The climb to the Catskills' highest peak — a full, demanding day out.",
        },
        {
          id: "escarpment-trail-section",
          name: "Escarpment Trail Section",
          distanceMiles: 8.0,
          durationMinutes: 360,
          elevationGainFeet: 2400,
          difficulty: "hard",
          routeType: "Point to Point",
          description:
            "A long ridgeline traverse with some of the best cliff-edge views in the park.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 140,
          parkingInfo:
            "Trailhead lots vary by peak; arrive early on weekends, several fill by 9am.",
        },
      },
      stayOptions: [
        {
          id: "north-south-lake-campground",
          name: "North-South Lake Campground",
          type: "Campground",
          nightlyCost: 28,
          distanceFromTrailMiles: 2.0,
          description:
            "DEC campground near Kaaterskill Falls with lake swimming.",
        },
        {
          id: "sunrise-motel-tannersville",
          name: "Sunrise Motel Tannersville",
          type: "Budget lodging",
          nightlyCost: 110,
          distanceFromTrailMiles: 7.0,
          description: "No-frills base for exploring the Catskill high peaks.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 40 },
        { label: "Camping / Lodging", amount: 45 },
        { label: "Food", amount: 25 },
        { label: "Park / Trail fees", amount: 10 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 55, condition: "Cloudy" },
        { day: "Saturday", tempF: 50, condition: "Rain" },
        { day: "Sunday", tempF: 58, condition: "Partly cloudy" },
      ],
    },
  },
  {
    id: "delaware-water-gap",
    name: "Delaware Water Gap",
    region: "Pennsylvania / New Jersey border",
    shortDescription:
      "River bends beneath forested ridgelines, with room for a riverside camp and an easy morning paddle.",
    activities: ["hiking", "camping"],
    difficulty: "moderate",
    estimatedTravelTimeMinutes: 95,
    transportationOptions: ["car"],
    carFreeFriendly: false,
    estimatedTripCost: 100,
    trailDistanceMiles: 6.5,
    rating: 4.4,
    adventureMatchScore: 71,
    imageGradient: "trail-1",
    detail: {
      matchBreakdown: {
        accessibility: 62,
        budgetFit: 68,
        activityMatch: 80,
        difficultyMatch: 75,
        travelTime: 70,
      },
      matchSummary:
        "A reasonable match for a moderate hike-and-camp weekend, mainly limited by the drive.",
      trails: [
        {
          id: "mount-tammany-trail",
          name: "Mount Tammany Trail",
          distanceMiles: 3.5,
          durationMinutes: 150,
          elevationGainFeet: 1200,
          difficulty: "hard",
          routeType: "Loop",
          description:
            "A steep climb rewarded with a wide view straight down the Delaware Water Gap.",
        },
        {
          id: "dunnfield-creek-trail",
          name: "Dunnfield Creek Trail",
          distanceMiles: 4.0,
          durationMinutes: 130,
          elevationGainFeet: 600,
          difficulty: "moderate",
          routeType: "Out & Back",
          description:
            "Follows a clear mountain stream through hemlock forest — a gentler option nearby.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 95,
          parkingInfo: "Free lots at the main trailheads.",
        },
      },
      stayOptions: [
        {
          id: "dingmans-campground",
          name: "Dingmans Campground",
          type: "Campground",
          nightlyCost: 35,
          distanceFromTrailMiles: 3.0,
          description: "Riverside tent sites near Dingmans Falls.",
        },
        {
          id: "deer-head-inn-lodging",
          name: "Deer Head Inn Lodging",
          type: "Budget lodging",
          nightlyCost: 130,
          distanceFromTrailMiles: 5.0,
          description: "Small-town inn above the historic jazz club.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 35 },
        { label: "Camping / Lodging", amount: 35 },
        { label: "Food", amount: 25 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 64, condition: "Sunny" },
        { day: "Saturday", tempF: 61, condition: "Partly cloudy" },
        { day: "Sunday", tempF: 67, condition: "Sunny" },
      ],
    },
  },
  {
    id: "fire-island-national-seashore",
    name: "Fire Island National Seashore",
    region: "Long Island, NY",
    shortDescription:
      "Car-free barrier island with dune trails, a lighthouse walk, and beachside camping by ferry.",
    activities: ["hiking", "camping"],
    difficulty: "easy",
    estimatedTravelTimeMinutes: 120,
    transportationOptions: ["no-car"],
    carFreeFriendly: true,
    estimatedTripCost: 130,
    trailDistanceMiles: 3.0,
    rating: 4.3,
    adventureMatchScore: 68,
    imageGradient: "trail-2",
    detail: {
      matchBreakdown: {
        accessibility: 75,
        budgetFit: 55,
        activityMatch: 80,
        difficultyMatch: 85,
        travelTime: 45,
      },
      matchSummary:
        "An easy, fully car-free trip — the ferry and lodging costs are what hold the score back.",
      trails: [
        {
          id: "sunken-forest-boardwalk",
          name: "Sunken Forest Boardwalk",
          distanceMiles: 1.5,
          durationMinutes: 60,
          elevationGainFeet: 20,
          difficulty: "easy",
          routeType: "Loop",
          description:
            "A flat boardwalk loop through a rare maritime holly forest right behind the dunes.",
        },
        {
          id: "lighthouse-trail",
          name: "Lighthouse Trail",
          distanceMiles: 3.0,
          durationMinutes: 90,
          elevationGainFeet: 40,
          difficulty: "easy",
          routeType: "Out & Back",
          description:
            "An easy dune walk out to the historic Fire Island Lighthouse.",
        },
      ],
      transportationDetails: {
        driving: {
          travelTimeMinutes: 75,
          parkingInfo:
            "Park at the ferry terminal in Sayville; about $15 per day.",
        },
        publicTransit: {
          steps: [
            "NYC Penn Station",
            "LIRR to Sayville",
            "Fire Island Ferry to Sailors Haven",
          ],
          travelTimeMinutes: 120,
          lastMileInfo:
            "The ferry docks directly at the trailhead — no vehicles are allowed on the island.",
        },
      },
      stayOptions: [
        {
          id: "watch-hill-campground",
          name: "Watch Hill Campground",
          type: "Campground",
          nightlyCost: 35,
          distanceFromTrailMiles: 0.3,
          description:
            "NPS-run oceanside camping, reservable ahead and reached by ferry.",
        },
        {
          id: "sunken-forest-bnb",
          name: "Sunken Forest B&B",
          type: "Budget lodging",
          nightlyCost: 195,
          distanceFromTrailMiles: 1.0,
          description: "Small inn near the Sailors Haven marina.",
        },
      ],
      costBreakdown: [
        { label: "Transportation", amount: 40 },
        { label: "Camping / Lodging", amount: 55 },
        { label: "Food", amount: 30 },
        { label: "Park / Trail fees", amount: 5 },
      ],
      weatherPreview: [
        { day: "Friday", tempF: 68, condition: "Sunny" },
        { day: "Saturday", tempF: 66, condition: "Breezy" },
        { day: "Sunday", tempF: 70, condition: "Sunny" },
      ],
    },
  },
];

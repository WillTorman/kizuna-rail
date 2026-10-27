import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const allRoutes = await getAllRoutes();
    const region = typeof req.query.region === 'string' ? req.query.region : '';
    const season = typeof req.query.season === 'string' ? req.query.season : '';
    const routes = allRoutes.filter(route => {
        const matchesRegion = !region || region === 'all' || route.region === region;
        const matchesSeason = !season || season === 'all' || route.bestSeason === season;

        return matchesRegion && matchesSeason;
    });

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};
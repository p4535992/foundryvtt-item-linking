import { applyFixes, checkFixes } from './fixes/fixes.js';
import API from './module/api.js';
import { findDerived } from './module/item.js';
import { MODULE, getSetting } from './module/settings.js';
import Logger from './module/lib/Logger.js';
import('./module/flags.js');
import('./module/compendium.js');
import('./module/actor.js');
Hooks.once('setup', () => {
    import('./module/embedded.js');
    const data = game.modules.get(MODULE);
    data.api = API;
});
Hooks.once('ready', async () => {
    Logger.log('Successfully Initialized');
    if (checkFixes()) {
        log(`Applying fixes since ${getSetting('update')}...`);
        await applyFixes();
        log(`All fixes applied`);
    }
    const derivations = findDerived();
    Logger.log(`${Object.keys(derivations).length} data links derived`);
});

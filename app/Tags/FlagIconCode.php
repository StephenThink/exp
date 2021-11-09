<?php

namespace App\Tags;

use Statamic\Config;
use Statamic\Sites\Sites;
use Statamic\Tags\Tags;

class FlagIconCode extends Tags
{
    /**
     * The {{ flag_icon_code }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        //
        $country = $this->params->get("country");
        //dd(config("statamic.sites.sites.{$country}.flag_code"));
        return (!$country ? "" : config("statamic.sites.sites.{$country}.flag_code"));
    }
}

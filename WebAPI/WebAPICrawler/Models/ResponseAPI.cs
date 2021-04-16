
public class Rootobject
{
    public string view { get; set; }
    public int page { get; set; }
    public int total_pages { get; set; }
    public int total_ads { get; set; }
    public int ads_on_page { get; set; }
    public int is_compact { get; set; }
    public object observed_id { get; set; }
    public string next_page_url { get; set; }
    public Ad[] ads { get; set; }
}

public class Ad
{
    public string id { get; set; }
    public string url { get; set; }
    public string preview_url { get; set; }
    public string title { get; set; }
    public string created { get; set; }
    public int age { get; set; }
    public string description { get; set; }
    public int highlighted { get; set; }
    public int urgent { get; set; }
    public int topAd { get; set; }
    public int category_id { get; set; }
    public string[][] _params { get; set; }
    public string[] subtitle { get; set; }
    public int business { get; set; }
    public int hide_user_ads_button { get; set; }
    public string status { get; set; }
    public string city_label { get; set; }
    public string header_city_label { get; set; }
    public int has_phone { get; set; }
    public int has_email { get; set; }
    public bool has_sms { get; set; }
    public string map_zoom { get; set; }
    public string map_lat { get; set; }
    public string map_lon { get; set; }
    public int map_radius { get; set; }
    public bool map_show_detailed { get; set; }
    public string person { get; set; }
    public string user_label { get; set; }
    public string user_ads_id { get; set; }
    public string user_id { get; set; }
    public string numeric_user_id { get; set; }
    public string user_ads_url { get; set; }
    public string list_label { get; set; }
    public string list_label_ad { get; set; }
    public Photo[] photos { get; set; }
    public Contact_Urls contact_urls { get; set; }
    public Detail[] details { get; set; }
    public Listing_Params[] listing_params { get; set; }
    public bool hide_price { get; set; }
    public Agent agent { get; set; }
    public Agency agency { get; set; }
    public object extra { get; set; }
    public string[] ad_featured { get; set; }
    public string ad_packages { get; set; }
    public string m { get; set; }
    public string rooms_num { get; set; }
}

public class Contact_Urls
{
    public Phone[] phone { get; set; }
    public Sm[] sms { get; set; }
    public string vcf { get; set; }
}

public class Phone
{
    public string url { get; set; }
    public string uri { get; set; }
}

public class Sm
{
    public string url { get; set; }
    public string uri { get; set; }
}

public class Agent
{
    public string name { get; set; }
    public Phone1[] phone { get; set; }
    public string photo { get; set; }
}

public class Phone1
{
    public string visible { get; set; }
    public string hidden { get; set; }
}

public class Agency
{
    public string name { get; set; }
    public string logo { get; set; }
    public Phone2[] phone { get; set; }
    public string address { get; set; }
}

public class Phone2
{
    public string hidden { get; set; }
    public string visible { get; set; }
}

public class Photo
{
    public string _0 { get; set; }
    public string _1 { get; set; }
    public string _2 { get; set; }
    public string _3 { get; set; }
}

public class Detail
{
    public string key { get; set; }
    public object value { get; set; }
}

public class Listing_Params
{
    public string key { get; set; }
    public string value { get; set; }
    public int position { get; set; }
    public bool top_hide { get; set; }
}

### 1.18.1 (2016-02-11)


#### Bug Fixes

* **input:** use corrected list of allowed input attributes ([d623c65c](https://github.com/ubilabs/react-geosuggest/commit/d623c65c6eb26ff84d5675e573a4991a93c4c74f))
* make classnames a real dependency  ([1fd93dd](https://github.com/ubilabs/react-geosuggest/commit/1fd93dd842820f87133ae4db48ba24fc064270fd))


## 1.18.0 (2016-02-10)


#### Features

* deploy dist folder via npm ([e5446a29](https://github.com/ubilabs/react-geosuggest/commit/e5446a298b2d9e0479a65786b908647b46d8bc9b))


## 1.17.0 (2016-02-10)

#### Bug Fixes

* Handle null value for Google suggestions ([cfd84ad](cfd84adeebda41d2b7e27576716fb3a30f63182c))

#### Features

* add focus() to focus on the element ([11c08af5](https://github.com/ubilabs/react-geosuggest/commit/11c08af5808d197254cbdfe3a78f99eafe0840b2))


### 1.16.1 (2016-02-07)

#### Bug Fixes

* Fix module build ([7de677c](7de677c51dcd87b67e371303ae3ee1f2242fa599))

## 1.16.0 (2016-02-05)

#### Bug Fixes

* autofocus -> autoFocus ([7f9daa0](7f9daa0b4d1813704448037322787e4004309e49))
* use ignoreBlur flag to avoid hiding suggests when clicking one ([4fa6bd2](4fa6bd2d5e381bfb55a53db86afbd9519c333958))
* Escape user input for regex to avoid Exception ([95b01ba](95b01ba1dae31d6780c4ed5fd72b9cfb4b3e10c2))

#### Features

* Use labelId instead of address to get the geocode ([f95d2a3](f95d2a337021b3ce49ef6094f53c388de9aa20d9))

### 1.15.1 (2016-01-18)


#### Bug Fixes

* add missing attribute id ([91f5ceea](https://github.com/ubilabs/react-geosuggest/commit/91f5ceea64c940a3cf26f0b913dfbcf784dfa40f))


## 1.15.0 (2016-01-18)


#### Features

* allow all standard input type attributes ([a43c388c](https://github.com/ubilabs/react-geosuggest/commit/a43c388cd168a60c90ec0b5d971d9f65316b8275), closes [#80](https://github.com/ubilabs/react-geosuggest/issues/80))


## 1.14.0 (2016-01-04)


#### Bug Fixes

* check whether component is still mounted after timeout ([67972d08](https://github.com/ubilabs/react-geosuggest/commit/67972d08ee24e77605ead13d23025854683454ef), closes [#71](https://github.com/ubilabs/react-geosuggest/issues/71))
* "use strict"; no longer throws errors if google cannot be loaded ([d8c97c0](https://github.com/ubilabs/react-geosuggest/commit/d8c97c0e1d023a31c4545fff24ff0a1e7b18c2b6))

#### Features

* Add property for input class name. ([c43b91a](https://github.com/ubilabs/react-geosuggest/commit/c43b91aa597d7d9685be994a431e54529464cabe))

## 1.13.0 (2015-10-29)

#### Features

* Remove defaults for search radius and location ([17f0bf0](https://github.com/ubilabs/react-geosuggest/commit/17f0bf053bde609c5f891ba4bb048d1cacc3f0b9))

## 1.12.0 (2015-10-22)


#### Bug Fixes

* doc comments, backward compatible changes ([96cca392](https://github.com/ubilabs/react-geosuggest/commit/96cca392f5b569247523cf784d34f1e1eb8b89d8))
* add copy css in build module ([bb988a1c](https://github.com/ubilabs/react-geosuggest/commit/bb988a1c5bf3079b170cd24c79bbd21093f49f93))
* googleMaps object moved out of props and set in componentDidMount ([955812df](https://github.com/ubilabs/react-geosuggest/commit/955812dfb702e8ea6318d89b2ef36d866c5c4354))


### 1.11.1 (2015-10-12)


#### Bug Fixes

* upgrade code to 0.14, too ([c5f64d47](https://github.com/ubilabs/react-geosuggest/commit/c5f64d47befef21c620bee1db41e86ffc1592194))


## 1.11.0 (2015-10-12)


#### Features

* bump peer dependency react to 0.14.0 ([dc39828e](https://github.com/ubilabs/react-geosuggest/commit/dc39828ea46552c60ce0a5ae33a52f6eee8c8f10))
* **input:** auto activate first suggest ([d1429b86](https://github.com/ubilabs/react-geosuggest/commit/d1429b8698c8928d69135fbe948f20f7e9246956))


## 1.10.0 (2015-09-29)


#### Bug Fixes

* prevent form submit on enter press ([dda86a12](https://github.com/ubilabs/react-geosuggest/commit/dda86a124a68ccf03220afb5f1796e99f183713e), closes [#49](https://github.com/ubilabs/react-geosuggest/issues/49))

#### Features

* add skipSuggest to not show certain suggestions  ([6da568d5](https://github.com/ubilabs/react-geosuggest/commit/6da568d5c0736fad7aacf21c864e8278544a544b)
* add getSuggestLabel to define a custom label  ([5103598](https://github.com/ubilabs/react-geosuggest/commit/51035989077a0eced308ac01f7e87a646893f767)
* **input:**  add disabled prop to disable ([7100d43e](https://github.com/ubilabs/react-geosuggest/commit/7100d43e2e3750e2506c78de32985974b915bb8f)

### 1.9.1 (2015-09-25)

#### Bug Fixes

* Fix issue if the initialValue changes ([b739b5c9](https://github.com/ubilabs/react-geosuggest/commit/b739b5c9b755f0efc05e28b01eb6b595b3d3cb9d))
* Build fixes so dist/ works with a global window.React  ([9b5e4369](https://github.com/ubilabs/react-geosuggest/commit/9b5e4369f7057e95ae5a36611cf5b7932dae50de))

## 1.9.0 (2015-09-09)

#### Features

* **input:**  add onChange callbacks  ([e6555ad](https://github.com/ubilabs/react-geosuggest/commit/e6555addbe3893b129488dc0623b7198036da35d)

## 1.8.0 (2015-09-01)

#### Features

* **input:**  add method to change the value of the user input  ([44d86f5](https://github.com/ubilabs/react-geosuggest/commit/44d86f5842765b72cb3db073feb016f750898e1f)


## 1.7.0 (2015-08-19)

#### Features

* **suggests:** add individual fixture classNames ([01b0e8a](https://github.com/ubilabs/react-geosuggest/commit/01b0e8a7a3e555729aeb56292a22bd8a412e4cf9)


## 1.6.0 (2015-08-12)


#### Features

* **input:** add bounds, country and types params ([00a84866](https://github.com/ubilabs/react-geosuggest/commit/00a84866d109ce4e323705558ffe319d56ecd5b1), closes [#20](https://github.com/ubilabs/react-geosuggest/issues/20))


## 1.5.0 (2015-08-12)


#### Features

* **input:**
  * add clear method to geosuggest  ([2d38a40](https://github.com/ubilabs/react-geosuggest/commit/2d38a4072b11c900d73b5cc26615a3cc69f286b4)
  * add onFocus and onBlur callbacks ([5051bc4](https://github.com/ubilabs/react-geosuggest/commit/5051bc424a4f508fa8dcff6683c690cc1ab9c2dd)

* **example:** add onFocus and onBlur demo ([88cf7f88](https://github.com/ubilabs/react-geosuggest/commit/88cf7f8873119f667aa514b8065e116d7a3741b2))


### 1.4.3 (2015-07-29)


#### Bug Fixes

* **example:** remove drop_console option from uglify ([e8e16112](https://github.com/ubilabs/react-geosuggest/commit/e8e16112d2d0f47f7ddc005dd485a25f7d55e4e7))


### 1.4.2 (2015-07-29)


#### Bug Fixes

* **build:** fix build for npm ([6475372](https://github.com/ubilabs/react-geosuggest/commit/6475372a468f19f075a20af012f8f85404172893))



### 1.4.1 (2015-07-21)


#### Bug Fixes

* **import:** add .npmignore ([add06073](https://github.com/ubilabs/react-geosuggest/commit/add06073990bb4c8934b8ad28c6c1bfb201f6945))


## 1.4.0 (2015-07-20)


#### Bug Fixes

* **input:** allow continuous editing ([62e83cce](https://github.com/ubilabs/react-geosuggest/commit/62e83cce9ac42e23916914691fb83b829d778d7e), closes [#12](https://github.com/ubilabs/react-geosuggest/issues/12))


#### Features

* **input:**
  * add new param className ([c1c990ec](https://github.com/ubilabs/react-geosuggest/commit/c1c990ec80e5210322d7d68b805d44a73196ca4e), closes [#8](https://github.com/ubilabs/react-geosuggest/issues/8))
  * add initial value param ([f97d8eba](https://github.com/ubilabs/react-geosuggest/commit/f97d8eba377ed789c1bbc21cfc4de94e85ef2760), closes [#13](https://github.com/ubilabs/react-geosuggest/issues/13))

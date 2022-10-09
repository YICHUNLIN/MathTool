# MathTool

## .env

prefix=api

## apis

> /{prefix}/v1/{namespace}/{function}

### namespace- area

> /{prefix}/v1/area

#### /{prefix}/v1/area/det

> body

```
{
    "data": [
        {"x": 0.0, "y": 0.0},
        {"x": 3.0, "y": 0.0},
        {"x": 3.0, "y": 3.0},
        {"x": 0.0, "y": 3.0}
    ]
}
```

> response

```
{
    "code": 200,
    "result": 9
}
```

#### /{prefix}/v1/area/integral

> body

```
{
    "data1": [
        {"x": 0.0, "y": 0.0},
        {"x": 3.0, "y": 0.0}
    ],
    "data2": [
        {"x": 0.0, "y": 3.0},
        {"x": 3.1, "y": 3.0}
    ]
}
```

> response

```
{
    "code": 200,
    "result": 9.3
}

```

### namespace- loc

> /{prefix}/v1/loc


### /{prefix}/v1/loc/wgs84totwd97?lat={lat}&lng={lng}

> query string

```
/api/v1/loc/wgs84totwd97?lat=24.46433703534633&lng=118.33060802550007

```
> response

```
{
    "x": 182140.56099999393,
    "y": 2706612.855998001
}
```

### /{prefix}/v1/loc/twd97towgs84?x={x}&y={y}

> query string

```
/api/v1/loc/twd97towgs84?x=182140.561&y=2706612.856

```
> response

```
{
    "lat": 24.46433703534633,
    "lng": 118.33060802550007
}
```
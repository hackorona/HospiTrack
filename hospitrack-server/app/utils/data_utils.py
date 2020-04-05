def set_default_values(data, **kwargs):
    for arg in kwargs:
        if arg not in data:
            data[arg] = kwargs[arg]
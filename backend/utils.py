import csv
import re

def parse_ros_time(ros_time_str):
    match = re.search(r"sec=(\d+), nanosec=(\d+)", ros_time_str)
    if match:
        sec = int(match.group(1))
        nanosec = int(match.group(2))
        return sec + nanosec * 1e-9
    return None

def parse_topo_pos(pos_str):
    parts = pos_str.strip("()").split(",")
    if len(parts) >= 2:
        return float(parts[0]), float(parts[1])
    return None, None

def parse_robot_data():
    robots = []
    robot_data_map = {}
    times = []

    with open("robot_info_data.csv", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            robots.append({
                "id": int(row["id"]),
                "name": row["robot_name"],
                "type": row["robot_type"]
            })

    with open("robot_data.csv", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            time = parse_ros_time(row["ros_time"])
            x, y = parse_topo_pos(row["topo_map_pos"])
            robot_id = int(row["robot_live_id"])

            if time is None or x is None or y is None:
                continue

            times.append(time)

            entry = {
                "time": time,
                "x": x,
                "y": y,
                "status": int(row["status"]),
                "type": row["robot_type"]
            }

            if robot_id not in robot_data_map:
                robot_data_map[robot_id] = []
            robot_data_map[robot_id].append(entry)

    for robot_id in robot_data_map:
        robot_data_map[robot_id].sort(key=lambda d: d["time"])

    return robots, robot_data_map, min(times), max(times)


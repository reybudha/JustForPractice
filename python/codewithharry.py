import argparse
import socket
from concurrent.futures import ThreadPoolExecutor, as_completed


def scan_port(host, port, timeout=0.5):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        result = sock.connect_ex((host, port))
        if result == 0:
            return port, "open"
        return port, "closed"
    except OSError:
        return port, "closed"
    finally:
        sock.close()


def scan_ports(host, start_port, end_port, threads=200, timeout=0.5):
    results = []
    with ThreadPoolExecutor(max_workers=threads) as executor:
        future_to_port = {
            executor.submit(scan_port, host, port, timeout): port
            for port in range(start_port, end_port + 1)
        }
        for future in as_completed(future_to_port):
            port, status = future.result()
            results.append((port, status))

    results.sort(key=lambda item: item[0])
    return results


def main():
    parser = argparse.ArgumentParser(
        description="Fast TCP port scanner that reports open and closed ports."
    )
    parser.add_argument("host", help="Target IP address or hostname")
    parser.add_argument(
        "--start",
        type=int,
        default=1,
        help="Starting port (default: 1)",
    )
    parser.add_argument(
        "--end",
        type=int,
        default=1024,
        help="Ending port (default: 1024)",
    )
    parser.add_argument(
        "--threads",
        type=int,
        default=200,
        help="Number of worker threads (default: 200)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=0.3,
        help="Socket timeout in seconds (default: 0.3)",
    )
    args = parser.parse_args()

    if args.start > args.end:
        print("Error: --start cannot be greater than --end")
        return

    print(f"Scanning {args.host} from port {args.start} to {args.end} ...")
    results = scan_ports(args.host, args.start, args.end, args.threads, args.timeout)

    open_ports = [port for port, status in results if status == "open"]
    closed_ports = [port for port, status in results if status == "closed"]

    print(f"Open ports: {open_ports if open_ports else 'None'}")
    print(f"Closed ports: {closed_ports if closed_ports else 'None'}")


if __name__ == "__main__":
    main()

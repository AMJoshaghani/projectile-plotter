package Run;

use strict;
use warnings;

sub new
{
	my $class_name = shift;
	my $self = {
		_angle  => shift,
		_v_init => shift,
		_x => [],
		_y => []
	};

	bless $self, $class_name;

	return $self;
}

sub calculate
{
	my ($self) = @_;
	system ( "node ../lib/projectile.js " . $self->{_angle} . " " . $self->{_v_init} . " 1> o.txt" );
	return;
}

sub gather
{
	my ($self) = @_;

	open (FH, qq\o.txt\) or die "Couldn't call calculations.";
	while( <FH> )
	{
		$_ =~ s/[\[\]]//g;
		my @o = eval "($_)";

		push(@{$self->{_x}}, $o[0]);
		push(@{$self->{_y}}, $o[1]);
	}
	close;
	system ( "rm o.txt" );
	return;
}

sub draw
{
	my ($self) = @_;

	system ( "python" . " ../lib/plot.py [" . join(",", @{$self->{_x}}) . "] [" . join(",", @{$self->{_y}}) . "]" );
	return;
}

sub run
{
	my ($self) = @_;
	$self->calculate();
	$self->gather();
	$self->draw();
	return;
}

1;